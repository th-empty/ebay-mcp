import type { EbayApiClient } from '../client.js';

/**
 * Message API - Buyer-seller messaging
 * Based on: docs/sell-apps/communication/commerce_message_v1_oas3.json
 */
export class MessageApi {
  private readonly basePath = '/commerce/message/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Bulk update conversation
   * Endpoint: POST /bulk_update_conversation
   * @throws Error if required parameters are missing or invalid
   */
  async bulkUpdateConversation(updateData: Record<string, unknown>) {
    if (!updateData || typeof updateData !== 'object') {
      throw new Error('updateData is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/bulk_update_conversation`, updateData);
    } catch (error) {
      throw new Error(
        `Failed to bulk update conversation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get conversations
   * Endpoint: GET /conversation
   * @throws Error if required parameters are missing or invalid
   */
  async getConversations(
    conversationType: string,
    limit?: number,
    offset?: number,
    conversationStatus?: string,
    otherPartyUsername?: string,
    startTime?: string,
    endTime?: string
  ) {
    if (!conversationType || typeof conversationType !== 'string') {
      throw new Error('conversationType is required and must be a string (FROM_MEMBERS or FROM_EBAY)');
    }

    const params: Record<string, string | number> = {
      conversation_type: conversationType,
    };

    if (limit !== undefined) {
      if (typeof limit !== 'number' || limit < 1) {
        throw new Error('limit must be a positive number when provided');
      }
      params.limit = limit;
    }
    if (offset !== undefined) {
      if (typeof offset !== 'number' || offset < 0) {
        throw new Error('offset must be a non-negative number when provided');
      }
      params.offset = offset;
    }
    if (conversationStatus !== undefined) {
      params.conversation_status = conversationStatus;
    }
    if (otherPartyUsername !== undefined) {
      params.other_party_username = otherPartyUsername;
    }
    if (startTime !== undefined) {
      params.start_time = startTime;
    }
    if (endTime !== undefined) {
      params.end_time = endTime;
    }

    try {
      return await this.client.get(`${this.basePath}/conversation`, params);
    } catch (error) {
      throw new Error(
        `Failed to get conversations: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get a specific conversation
   * Endpoint: GET /conversation/{conversation_id}
   * @throws Error if required parameters are missing or invalid
   */
  async getConversation(conversationId: string, conversationType?: string) {
    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('conversationId is required and must be a string');
    }

    const params: Record<string, string> = {};
    if (conversationType) {
      params.conversation_type = conversationType;
    }

    try {
      return await this.client.get(
        `${this.basePath}/conversation/${conversationId}`,
        Object.keys(params).length > 0 ? params : undefined
      );
    } catch (error) {
      throw new Error(
        `Failed to get conversation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Send a message
   * Endpoint: POST /send_message
   * @throws Error if required parameters are missing or invalid
   */
  async sendMessage(messageData: Record<string, unknown>) {
    if (!messageData || typeof messageData !== 'object') {
      throw new Error('messageData is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/send_message`, messageData);
    } catch (error) {
      throw new Error(
        `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update a conversation
   * Endpoint: POST /update_conversation
   * @throws Error if required parameters are missing or invalid
   */
  async updateConversation(updateData: Record<string, unknown>) {
    if (!updateData || typeof updateData !== 'object') {
      throw new Error('updateData is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/update_conversation`, updateData);
    } catch (error) {
      throw new Error(
        `Failed to update conversation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Search for messages
   * @deprecated Use getConversations() instead
   */
  async searchMessages(conversationType: string, limit?: number, offset?: number) {
    return await this.getConversations(conversationType, limit, offset);
  }

  /**
   * Get a specific message
   * @deprecated Use getConversation() instead
   */
  async getMessage(messageId: string) {
    return await this.getConversation(messageId);
  }

  /**
   * Reply to a message
   * @deprecated Use sendMessage() instead
   */
  async replyToMessage(messageId: string, messageContent: string) {
    return await this.sendMessage({
      conversationId: messageId,
      messageText: messageContent,
    });
  }
}
