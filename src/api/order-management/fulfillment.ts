import type { components } from '@/types/sell-apps/order-management/sellFulfillmentV1Oas3.js';
import type { EbayApiClient } from '../client.js';

type IssueRefundRequest = components['schemas']['IssueRefundRequest'];
type ShippingFulfillmentDetails = components['schemas']['ShippingFulfillmentDetails'];
type Order = components['schemas']['Order'];
type OrderSearchPagedCollection = components['schemas']['OrderSearchPagedCollection'];
type Refund = components['schemas']['Refund'];
type ShippingFulfillment = components['schemas']['ShippingFulfillment'];
type ShippingFulfillmentPagedCollection =
  components['schemas']['ShippingFulfillmentPagedCollection'];

/**
 * Fulfillment API - Order processing and shipping
 * Based on: docs/sell-apps/order-management/sell_fulfillment_v1_oas3.json
 */
export class FulfillmentApi {
  private readonly basePath = '/sell/fulfillment/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get orders for the seller
   */
  async getOrders(
    filter?: string,
    limit?: number,
    offset?: number
  ): Promise<OrderSearchPagedCollection> {
    const params: Record<string, string | number> = {};
    if (filter) params.filter = filter;
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    return await this.client.get<OrderSearchPagedCollection>(`${this.basePath}/order`, params);
  }

  /**
   * Get a specific order
   */
  async getOrder(orderId: string): Promise<Order> {
    return await this.client.get<Order>(`${this.basePath}/order/${orderId}`);
  }

  /**
   * Create a shipping fulfillment
   */
  async createShippingFulfillment(
    orderId: string,
    fulfillment: ShippingFulfillmentDetails
  ): Promise<void> {
    return await this.client.post<void>(
      `${this.basePath}/order/${orderId}/shipping_fulfillment`,
      fulfillment
    );
  }

  /**
   * Get shipping fulfillments for an order
   */
  async getShippingFulfillments(orderId: string): Promise<ShippingFulfillmentPagedCollection> {
    return await this.client.get<ShippingFulfillmentPagedCollection>(
      `${this.basePath}/order/${orderId}/shipping_fulfillment`
    );
  }

  /**
   * Get a specific shipping fulfillment
   * @param orderId The unique identifier of the order.
   * @param fulfillmentId The unique identifier of the fulfillment.
   */
  async getShippingFulfillment(
    orderId: string,
    fulfillmentId: string
  ): Promise<ShippingFulfillment> {
    return await this.client.get<ShippingFulfillment>(
      `${this.basePath}/order/${orderId}/shipping_fulfillment/${fulfillmentId}`
    );
  }

  /**
   * Issue a refund
   */
  async issueRefund(orderId: string, refund: IssueRefundRequest): Promise<Refund> {
    return await this.client.post<Refund>(`${this.basePath}/order/${orderId}/issue_refund`, refund);
  }

  /**
   * Find all orders by buyer username (server-side pagination)
   * eBay's Orders API does not support filtering by buyer username natively,
   * so this method paginates through all orders in batches and filters in-memory.
   * Uses limit=200 (API max) per request for efficiency.
   */
  async findOrdersByBuyer(
    buyerUsername: string,
    filter?: string,
    maxResults = 50
  ): Promise<Order[]> {
    const batchSize = 200; // eBay API maximum
    const matchingOrders: Order[] = [];
    let offset = 0;
    let totalFetched = 0;
    let total: number | undefined = undefined;

    while (true) {
      const params: Record<string, string | number> = { limit: batchSize, offset };
      if (filter) params.filter = filter;

      const response = await this.client.get<OrderSearchPagedCollection>(
        `${this.basePath}/order`,
        params
      );

      const orders = response.orders ?? [];
      if (total === undefined) total = response.total ?? 0;

      for (const order of orders) {
        if (order.buyer?.username === buyerUsername) {
          matchingOrders.push(order);
          if (matchingOrders.length >= maxResults) {
            return matchingOrders;
          }
        }
      }

      totalFetched += orders.length;
      if (orders.length < batchSize || totalFetched >= (total ?? 0)) break;
      offset += batchSize;
    }

    return matchingOrders;
  }

  /**
   * Get payment dispute summaries
   * Note: This method delegates to the DisputeApi
   */
  async getPaymentDisputeSummaries(params?: {
    order_id?: string;
    buyer_username?: string;
    open_date_from?: string;
    open_date_to?: string;
    payment_dispute_status?: string;
    limit?: number;
    offset?: number;
  }): Promise<unknown> {
    return await this.client.get(`${this.basePath}/payment_dispute_summary`, params);
  }

  /**
   * Get payment dispute activities
   * Note: This method delegates to the DisputeApi
   */
  async getActivities(paymentDisputeId: string): Promise<unknown> {
    return await this.client.get(`${this.basePath}/payment_dispute/${paymentDisputeId}/activity`);
  }

  /**
   * Get payment dispute details
   * Note: This method delegates to the DisputeApi
   */
  async getPaymentDispute(paymentDisputeId: string): Promise<unknown> {
    return await this.client.get(`${this.basePath}/payment_dispute/${paymentDisputeId}`);
  }

  /**
   * Get shipping quote
   */
  async getShippingQuote(request: {
    rateTableId?: string;
    shippingAddress?: unknown;
    lineItems?: unknown[];
  }): Promise<unknown> {
    return await this.client.post(`${this.basePath}/shipping_quote`, request);
  }

  /**
   * Get cancellation details for an order
   */
  async getCancellation(orderId: string, cancellationId: string): Promise<unknown> {
    return await this.client.get(
      `${this.basePath}/order/${orderId}/cancellation/${cancellationId}`
    );
  }
}
