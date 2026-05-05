import { EbayOAuthClient } from '@/auth/oauth.js';
import { getBaseUrl } from '@/config/environment.js';
import type { EbayApiError, EbayConfig } from '@/types/ebay.js';
import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { apiLogger, logRequest, logResponse, logErrorResponse } from '@/utils/logger.js';

// Extended Axios config with retry tracking
interface AxiosConfigWithRetry extends AxiosRequestConfig {
  __authRetryCount?: number;
  __retryCount?: number;
}

/**
 * Rate limit tracking
 */
class RateLimitTracker {
  private requestTimestamps: number[] = [];
  private readonly windowMs = 60000; // 1 minute window
  private readonly maxRequests = 5000; // Conservative limit

  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove timestamps older than window
    this.requestTimestamps = this.requestTimestamps.filter(
      (timestamp) => now - timestamp < this.windowMs
    );
    return this.requestTimestamps.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requestTimestamps.push(Date.now());
  }

  getStats(): { current: number; max: number; windowMs: number } {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(
      (timestamp) => now - timestamp < this.windowMs
    );
    return {
      current: this.requestTimestamps.length,
      max: this.maxRequests,
      windowMs: this.windowMs,
    };
  }
}

/**
 * Base client for making eBay API requests
 */
export class EbayApiClient {
  private httpClient: AxiosInstance;
  private authClient: EbayOAuthClient;
  private baseUrl: string;
  private rateLimitTracker: RateLimitTracker;
  private config: EbayConfig;

  /**
   * Build default request headers based on configured marketplace and language.
   */
  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (this.config.contentLanguage) {
      headers['Content-Language'] = this.config.contentLanguage;
    }

    if (this.config.marketplaceId) {
      headers['X-EBAY-C-MARKETPLACE-ID'] = this.config.marketplaceId;
    }

    return headers;
  }

  constructor(config: EbayConfig) {
    this.config = config;
    this.authClient = new EbayOAuthClient(config);
    this.baseUrl = getBaseUrl(config.environment);
    this.rateLimitTracker = new RateLimitTracker();

    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: this.getDefaultHeaders(),
    });

    // Add request interceptor to inject auth token and check rate limits
    this.httpClient.interceptors.request.use(
      async (config) => {
        // Check rate limit before making request
        if (!this.rateLimitTracker.canMakeRequest()) {
          const stats = this.rateLimitTracker.getStats();
          throw new Error(
            `Rate limit exceeded: ${stats.current}/${stats.max} requests in ${stats.windowMs}ms window. Please wait before making more requests.`
          );
        }

        const token = await this.authClient.getAccessToken();
        config.headers.Authorization = `Bearer ${token}`;

        // Record the request
        this.rateLimitTracker.recordRequest();

        // Log outgoing request details
        logRequest(
          config.method || 'GET',
          `${config.baseURL}${config.url}`,
          config.params as Record<string, unknown>,
          config.data
        );

        return config;
      },
      (error: Error) => {
        apiLogger.error('Request interceptor error', { error: error.message });
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling and retry logic
    this.httpClient.interceptors.response.use(
      (response) => {
        // Extract rate limit info from headers if available
        const remaining = response.headers['x-ebay-c-ratelimit-remaining'];
        const limit = response.headers['x-ebay-c-ratelimit-limit'];

        // Log response details
        logResponse(response.status, response.statusText, response.data, remaining, limit);

        return response;
      },
      async (error: AxiosError) => {
        const axiosError = error;
        const config = axiosError.config as AxiosConfigWithRetry | undefined;

        // Log error response details
        if (axiosError.response) {
          logErrorResponse(
            axiosError.response.status,
            axiosError.response.statusText,
            `${config?.baseURL}${config?.url}`,
            axiosError.response.data
          );
        } else if (axiosError.request) {
          apiLogger.error('No response received from server', {
            url: `${config?.baseURL}${config?.url}`,
          });
        } else {
          apiLogger.error('Request setup error', { error: axiosError.message });
        }

        // Handle authentication errors (401 Unauthorized)
        if (axiosError.response?.status === 401) {
          const retryCount = config?.__authRetryCount || 0;

          // Only retry once to avoid infinite loops
          if (retryCount === 0 && config) {
            config.__authRetryCount = 1;

            apiLogger.warn('Authentication error (401). Attempting to refresh user token...');

            try {
              // Force token refresh by getting a new access token
              // The getAccessToken() method will automatically refresh if needed
              const newToken = await this.authClient.getAccessToken();

              // Update the request with the new token
              if (config?.headers) {
                config.headers.Authorization = `Bearer ${newToken}`;
              }

              apiLogger.info('Token refreshed successfully. Retrying request...');

              // Retry the request with the new token
              return await this.httpClient.request(config);
            } catch (refreshError) {
              apiLogger.error('Failed to refresh token', {
                error: refreshError instanceof Error ? refreshError.message : 'Unknown error',
              });

              // If refresh fails, provide clear guidance
              const ebayError = axiosError.response?.data as EbayApiError;
              const originalError =
                ebayError.errors?.[0]?.longMessage ||
                ebayError.errors?.[0]?.message ||
                'Invalid access token';

              throw new Error(
                `${originalError}. ` +
                  `Token refresh failed: ${refreshError instanceof Error ? refreshError.message : 'Unknown error'}. ` +
                  `Please use the ebay_set_user_tokens_with_expiry tool to provide valid tokens.`
              );
            }
          }

          // If retry already attempted, provide helpful error message
          const ebayError = axiosError.response?.data as EbayApiError;
          const errorMessage =
            ebayError.errors?.[0]?.longMessage ||
            ebayError.errors?.[0]?.message ||
            'Invalid access token';

          throw new Error(
            `${errorMessage}. ` +
              `Automatic token refresh failed. Please use the ebay_set_user_tokens_with_expiry tool to provide valid tokens.`
          );
        }

        // Handle rate limit errors (429)
        if (axiosError.response?.status === 429) {
          const retryAfter = axiosError.response.headers['retry-after'];
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 60000;

          throw new Error(
            `eBay API rate limit exceeded. Retry after ${waitTime / 1000} seconds. ` +
              `Consider reducing request frequency or upgrading to user tokens for higher limits.`
          );
        }

        // Handle server errors with retry suggestion (500, 502, 503, 504)
        if (axiosError.response?.status && axiosError.response.status >= 500 && config) {
          const retryCount = config.__retryCount || 0;

          if (retryCount < 3) {
            config.__retryCount = retryCount + 1;
            const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff

            apiLogger.warn(`Server error (${axiosError.response.status}). Retrying...`, {
              attempt: `${retryCount + 1}/3`,
              delayMs: Math.min(delay, 5000),
            });

            await new Promise<void>((resolve) => {
              setTimeout(resolve, Math.min(delay, 5000));
            });
            return await this.httpClient.request(config);
          }
        }

        // Handle eBay-specific errors
        if (axios.isAxiosError(axiosError) && axiosError.response?.data) {
          const ebayError = axiosError.response.data as EbayApiError;
          const errorMessage =
            ebayError.errors?.[0]?.longMessage ||
            ebayError.errors?.[0]?.message ||
            axiosError.message;
          throw new Error(`eBay API Error: ${errorMessage}`);
        }

        throw error;
      }
    );
  }

  /**
   * Validate that access token is available before making API request
   */
  private validateAccessToken(): void {
    if (!this.config.clientId || !this.config.clientSecret) {
      throw new Error(
        'Missing required eBay credentials. Please set EBAY_CLIENT_ID and EBAY_CLIENT_SECRET in your .env file.'
      );
    }
  }

  /**
   * Make a GET request to eBay API
   */
  async get<T = unknown>(
    endpoint: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    this.validateAccessToken();
    const response = await this.httpClient.get<T>(endpoint, { params, ...config });
    return response.data;
  }

  /**
   * Make a POST request to eBay API
   */
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    this.validateAccessToken();
    const response = await this.httpClient.post<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Make a PUT request to eBay API
   */
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    this.validateAccessToken();
    const response = await this.httpClient.put<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Make a DELETE request to eBay API
   */
  async delete<T = unknown>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    this.validateAccessToken();
    const response = await this.httpClient.delete<T>(endpoint, config);
    return response.data;
  }

  /**
   * Execute an HTTP request using the IAF TOKEN auth scheme (for Post-Order API v2).
   * Includes automatic token refresh on 401 and retry with exponential backoff on 5xx.
   */
  private async requestWithTokenAuth<T = unknown>(
    method: 'GET' | 'POST',
    endpoint: string,
    options?: { params?: Record<string, unknown>; data?: unknown },
  ): Promise<T> {
    this.validateAccessToken();

    if (!this.rateLimitTracker.canMakeRequest()) {
      const stats = this.rateLimitTracker.getStats();
      throw new Error(
        `Rate limit exceeded: ${stats.current}/${stats.max} requests in ${stats.windowMs}ms window. Please wait before making more requests.`
      );
    }

    let token = await this.authClient.getAccessToken();
    this.rateLimitTracker.recordRequest();

    const makeRequest = async (authToken: string) => {
      // Post-Order API v2 uses minimal headers — no marketplace or language headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `TOKEN ${authToken}`,
        },
        timeout: 30000,
      };

      if (method === 'GET') {
        return axios.get<T>(`${this.baseUrl}${endpoint}`, { ...config, params: options?.params });
      } else {
        return axios.post<T>(`${this.baseUrl}${endpoint}`, options?.data, config);
      }
    };

    try {
      const response = await makeRequest(token);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // Handle 401 — attempt token refresh
      if (axiosError.response?.status === 401) {
        apiLogger.warn('Post-Order API 401. Attempting token refresh...');
        try {
          await this.authClient.refreshUserToken();
          token = await this.authClient.getAccessToken();
          apiLogger.info('Token refreshed. Retrying Post-Order request...');
          const retryResponse = await makeRequest(token);
          return retryResponse.data;
        } catch (refreshError) {
          const ebayError = axiosError.response?.data as EbayApiError;
          const originalError =
            (ebayError as any)?.errors?.[0]?.longMessage ||
            (ebayError as any)?.errors?.[0]?.message ||
            axiosError.response?.data ||
            'Invalid access token';
          throw new Error(
            `Post-Order API: ${originalError}. ` +
            `Token refresh failed: ${refreshError instanceof Error ? refreshError.message : 'Unknown error'}. ` +
            `Please use ebay_set_user_tokens_with_expiry to provide valid tokens.`
          );
        }
      }

      // Handle 429 — rate limit
      if (axiosError.response?.status === 429) {
        const retryAfter = (axiosError.response.headers as Record<string, string>)['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 60000;
        throw new Error(`Post-Order API rate limit exceeded. Retry after ${waitTime / 1000} seconds.`);
      }

      // Handle 5xx — retry up to 3 times with exponential backoff
      if (axiosError.response?.status && axiosError.response.status >= 500) {
        for (let attempt = 1; attempt <= 3; attempt++) {
          const delay = Math.min(Math.pow(2, attempt) * 1000, 5000);
          apiLogger.warn(`Post-Order API server error (${axiosError.response.status}). Retry ${attempt}/3 in ${delay}ms...`);
          await new Promise<void>((resolve) => setTimeout(resolve, delay));
          try {
            const retryResponse = await makeRequest(token);
            return retryResponse.data;
          } catch (retryError: unknown) {
            const retryAxios = retryError as AxiosError;
            if (attempt === 3 || (retryAxios.response?.status && retryAxios.response.status < 500)) {
              throw retryError;
            }
          }
        }
      }

      // Handle eBay-specific error format
      if (axiosError.response?.data) {
        const ebayError = axiosError.response.data as any;
        const errorMessage =
          ebayError?.errors?.[0]?.longMessage ||
          ebayError?.errors?.[0]?.message ||
          ebayError?.errorMessage?.error?.[0]?.message ||
          (typeof ebayError === 'string' ? ebayError : axiosError.message);
        // Include full error details for debugging
        const errorDetails = JSON.stringify(axiosError.response.data).substring(0, 500);
        apiLogger.error(`Post-Order API Error details: ${errorDetails}`);
        throw new Error(`Post-Order API Error (${axiosError.response.status}): ${errorMessage} | Details: ${errorDetails}`);
      }

      throw error;
    }
  }

  /**
   * Make a GET request using the IAF TOKEN auth scheme (for Post-Order API v2).
   * The Post-Order API v2 requires "TOKEN <token>" instead of "Bearer <token>".
   * Includes automatic token refresh on 401 and retry on 5xx.
   */
  async getWithTokenAuth<T = unknown>(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    return this.requestWithTokenAuth<T>('GET', endpoint, { params });
  }

  /**
   * Make a POST request using the IAF TOKEN auth scheme (for Post-Order API v2).
   * Includes automatic token refresh on 401 and retry on 5xx.
   */
  async postWithTokenAuth<T = unknown>(
    endpoint: string,
    data?: unknown,
  ): Promise<T> {
    return this.requestWithTokenAuth<T>('POST', endpoint, { data });
  }

  /**
   * Initialize the client (load user tokens from storage)
   */
  async initialize(): Promise<void> {
    await this.authClient.initialize();
  }

  /**
   * Check if client is authenticated
   */
  isAuthenticated(): boolean {
    return this.authClient.isAuthenticated();
  }

  /**
   * Check if user tokens are available
   */
  hasUserTokens(): boolean {
    return this.authClient.hasUserTokens();
  }

  /**
   * Set user access and refresh tokens
   */
  async setUserTokens(
    accessToken: string,
    refreshToken: string,
    accessTokenExpiry?: number,
    refreshTokenExpiry?: number
  ): Promise<void> {
    this.authClient.setUserTokens(accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry);
  }

  /**
   * Get token information for debugging
   */
  getTokenInfo() {
    return this.authClient.getTokenInfo();
  }

  /**
   * Get the OAuth client instance for advanced operations
   */
  getOAuthClient(): EbayOAuthClient {
    return this.authClient;
  }

  /**
   * Get rate limit statistics
   */
  getRateLimitStats() {
    return this.rateLimitTracker.getStats();
  }

  /**
   * Get the config object (for accessing environment, etc.)
   */
  getConfig(): EbayConfig {
    return this.config;
  }

  /**
   * Manually refresh user access token using the refresh token
   * This is useful when you encounter "Invalid access token" errors
   * The token will be automatically saved to storage after refresh
   */
  async refreshUserToken(): Promise<void> {
    await this.authClient.refreshUserToken();
  }

  /**
   * Make a GET request with a full URL (for APIs that use different base URLs)
   * Used by Identity API which uses apiz subdomain
   */
  async getWithFullUrl<T = unknown>(fullUrl: string, params?: Record<string, unknown>): Promise<T> {
    this.validateAccessToken();

    // Check rate limit
    if (!this.rateLimitTracker.canMakeRequest()) {
      const stats = this.rateLimitTracker.getStats();
      throw new Error(
        `Rate limit exceeded: ${stats.current}/${stats.max} requests in ${stats.windowMs}ms window. Please wait before making more requests.`
      );
    }

    // Get auth token
    let token = await this.authClient.getAccessToken();

    // Record the request
    this.rateLimitTracker.recordRequest();

    try {
      // Make request with full URL
      const response = await axios.get<T>(fullUrl, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          ...this.getDefaultHeaders(),
        },
        timeout: 30000,
      });
      return response.data;
    } catch (error) {
      // Handle 401 authentication errors with automatic token refresh
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        apiLogger.warn(
          'Authentication error (401) on full URL request. Attempting to refresh user token...'
        );

        try {
          // Refresh the token
          await this.authClient.refreshUserToken();

          // Get the new token
          token = await this.authClient.getAccessToken();

          apiLogger.info('Token refreshed successfully. Retrying request...');

          // Retry the request with the new token
          const response = await axios.get<T>(fullUrl, {
            params,
            headers: {
              Authorization: `Bearer ${token}`,
              ...this.getDefaultHeaders(),
            },
            timeout: 30000,
          });

          return response.data;
        } catch (refreshError) {
          apiLogger.error('Failed to refresh token', {
            error: refreshError instanceof Error ? refreshError.message : 'Unknown error',
          });

          const ebayError = error.response?.data as EbayApiError;
          const originalError =
            ebayError.errors?.[0]?.longMessage ||
            ebayError.errors?.[0]?.message ||
            'Invalid access token';

          throw new Error(
            `${originalError}. ` +
              `Token refresh failed: ${refreshError instanceof Error ? refreshError.message : 'Unknown error'}. ` +
              `Please use the ebay_set_user_tokens_with_expiry tool to provide valid tokens.`
          );
        }
      }

      // Re-throw other errors
      throw error;
    }
  }
}
