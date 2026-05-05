import { z } from 'zod';
import type { ToolDefinition } from './fulfillment.js';

/**
 * Order Issue Tools - Cancellations & Refunds
 *
 * These tools use the Fulfillment API (which works) to find orders with
 * cancellation requests and refunds. They replace the deprecated Post-Order API v2
 * which is no longer accessible for most accounts.
 */
export const postOrderTools: ToolDefinition[] = [
  {
    name: 'ebay_get_cancellation_requests',
    description:
      'Find orders that have active cancellation requests from buyers.\n' +
      'Scans recent orders and returns those where cancelState is not NONE_REQUESTED.\n' +
      'Use the optional filter parameter to narrow by date range (eBay filter syntax).\n\n' +
      'Example filter: "creationdate:[2026-01-01T00:00:00.000Z..2026-05-01T00:00:00.000Z]"\n\n' +
      'Returns order objects with full details including cancelStatus, buyer info, and line items.',
    inputSchema: {
      filter: z
        .string()
        .optional()
        .describe(
          'eBay Orders API filter string to narrow results. ' +
          'Example: "creationdate:[2026-01-01T00:00:00.000Z..2026-05-05T00:00:00.000Z]"'
        ),
      maxResults: z
        .number()
        .optional()
        .describe('Maximum number of matching orders to return (default: 50)'),
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'ebay_get_refunded_orders',
    description:
      'Find orders that have processed refunds (partial or full).\n' +
      'Scans recent orders and returns those with non-empty refunds in paymentSummary.\n' +
      'Use the optional filter parameter to narrow by date range (eBay filter syntax).\n\n' +
      'Example filter: "creationdate:[2026-01-01T00:00:00.000Z..2026-05-01T00:00:00.000Z]"\n\n' +
      'Returns order objects with full details including refund amounts, buyer info, and line items.',
    inputSchema: {
      filter: z
        .string()
        .optional()
        .describe(
          'eBay Orders API filter string to narrow results. ' +
          'Example: "creationdate:[2026-01-01T00:00:00.000Z..2026-05-05T00:00:00.000Z]"'
        ),
      maxResults: z
        .number()
        .optional()
        .describe('Maximum number of matching orders to return (default: 50)'),
    },
    annotations: { readOnlyHint: true },
  },
  // === Post-Order API v2 Tools (uses TOKEN auth scheme) ===

  // Inquiry Management
  {
    name: 'ebay_search_inquiries',
    description:
      'Search for buyer inquiries (Item Not Received, Return requests, etc.).\n' +
      'Uses the Post-Order API v2 with IAF TOKEN auth.\n\n' +
      'Required OAuth Scope: https://api.ebay.com/oauth/api_scope/sell.fulfillment',
    inputSchema: {
      inquiry_creation_date_from: z
        .string()
        .optional()
        .describe('Filter inquiries created on or after this date (ISO 8601, e.g., "2026-01-01T00:00:00.000Z")'),
      inquiry_creation_date_to: z
        .string()
        .optional()
        .describe('Filter inquiries created on or before this date (ISO 8601)'),
      inquiry_status: z
        .string()
        .optional()
        .describe('Filter by status (e.g., OPEN, CLOSED)'),
      item_id: z.string().optional().describe('Filter by eBay item ID'),
      order_id: z.string().optional().describe('Filter by order ID'),
      transaction_id: z.string().optional().describe('Filter by transaction ID'),
      limit: z.string().optional().describe('Maximum results per page (as string)'),
      offset: z.string().optional().describe('Number of results to skip (as string)'),
      sort: z.string().optional().describe('Sort order (e.g., "creation_date DESC")'),
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'ebay_get_inquiry',
    description:
      'Get detailed information about a specific buyer inquiry by ID.\n' +
      'Returns full inquiry history including messages, status, and resolution details.\n\n' +
      'Required OAuth Scope: https://api.ebay.com/oauth/api_scope/sell.fulfillment',
    inputSchema: {
      inquiryId: z.string().describe('The unique inquiry ID (e.g., "5376995582")'),
    },
    annotations: { readOnlyHint: true },
  },

  // Case Management
  {
    name: 'ebay_search_cases',
    description:
      'Search for eBay cases (escalated disputes between buyer and seller).\n' +
      'Uses the Post-Order API v2 with IAF TOKEN auth.\n\n' +
      'Required OAuth Scope: https://api.ebay.com/oauth/api_scope/sell.fulfillment',
    inputSchema: {
      case_creation_date_range_from: z
        .string()
        .optional()
        .describe('Filter cases created on or after this date (ISO 8601)'),
      case_creation_date_range_to: z
        .string()
        .optional()
        .describe('Filter cases created on or before this date (ISO 8601)'),
      case_status_filter: z
        .string()
        .optional()
        .describe('Filter by case status (e.g., OPEN, CLOSED, ESCALATED)'),
      item_id: z.string().optional().describe('Filter by eBay item ID'),
      order_id: z.string().optional().describe('Filter by order ID'),
      return_id: z.string().optional().describe('Filter by return ID'),
      transaction_id: z.string().optional().describe('Filter by transaction ID'),
      limit: z.number().optional().describe('Maximum results per page'),
      offset: z.number().optional().describe('Number of results to skip'),
      sort: z.string().optional().describe('Sort order'),
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'ebay_get_case',
    description:
      'Get detailed information about a specific eBay case by ID.\n' +
      'Returns full case history including messages and resolution details.\n\n' +
      'Required OAuth Scope: https://api.ebay.com/oauth/api_scope/sell.fulfillment',
    inputSchema: {
      caseId: z.string().describe('The unique case ID'),
    },
    annotations: { readOnlyHint: true },
  },

  // Return Management
  {
    name: 'ebay_search_returns',
    description:
      'Search for return requests from buyers.\n' +
      'Uses the Post-Order API v2 with IAF TOKEN auth.\n\n' +
      'Required OAuth Scope: https://api.ebay.com/oauth/api_scope/sell.fulfillment',
    inputSchema: {
      creation_date_from: z
        .string()
        .optional()
        .describe('Filter returns created on or after this date (ISO 8601)'),
      creation_date_to: z
        .string()
        .optional()
        .describe('Filter returns created on or before this date (ISO 8601)'),
      item_id: z.string().optional().describe('Filter by eBay item ID'),
      order_id: z.string().optional().describe('Filter by order ID'),
      return_state: z
        .string()
        .optional()
        .describe('Filter by return state (e.g., ITEM_DELIVERED, RETURN_STARTED, CLOSED)'),
      transaction_id: z.string().optional().describe('Filter by transaction ID'),
      limit: z.string().optional().describe('Maximum results per page (as string)'),
      offset: z.string().optional().describe('Number of results to skip (as string)'),
      sort: z.string().optional().describe('Sort order'),
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'ebay_get_return',
    description:
      'Get detailed information about a specific return request by ID.\n' +
      'Returns full return history including messages and resolution details.\n\n' +
      'Required OAuth Scope: https://api.ebay.com/oauth/api_scope/sell.fulfillment',
    inputSchema: {
      returnId: z.string().describe('The unique return ID'),
    },
    annotations: { readOnlyHint: true },
  },

  // === WRITE ACTIONS ===

  // Inquiry Write Actions
  {
    name: 'ebay_send_inquiry_message',
    description:
      'Send a message/response to a buyer inquiry (INR case).\n' +
      'This appears as "Seller offered another solution" in the inquiry history.\n\n' +
      'CAUTION: This sends a visible message to the buyer.',
    inputSchema: {
      inquiryId: z.string().describe('The unique inquiry ID'),
      message: z.string().describe('The message text to send to the buyer'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_provide_inquiry_shipment_info',
    description:
      'Provide shipment tracking info for an inquiry to prove item was shipped.\n' +
      'Can resolve INR (Item Not Received) inquiries if tracking confirms delivery.',
    inputSchema: {
      inquiryId: z.string().describe('The unique inquiry ID'),
      trackingNumber: z.string().describe('The shipment tracking number'),
      shippingCarrierName: z.string().describe('The shipping carrier (e.g., "DHL", "Deutsche Post", "DPD", "Hermes")'),
      comments: z.string().optional().describe('Optional comment to the buyer'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_issue_inquiry_refund',
    description:
      'Issue a full refund for an inquiry. This resolves the inquiry in favor of the buyer.\n\n' +
      'CAUTION: This immediately refunds the buyer. Cannot be undone.',
    inputSchema: {
      inquiryId: z.string().describe('The unique inquiry ID'),
      comments: z.string().optional().describe('Optional comment explaining the refund'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_escalate_inquiry',
    description:
      'Escalate an inquiry to eBay customer service (converts to a case).\n' +
      'Use when the buyer is unresponsive or you cannot resolve the issue directly.',
    inputSchema: {
      inquiryId: z.string().describe('The unique inquiry ID'),
      escalateReason: z.string().describe('Reason for escalation (e.g., "BUYER_NOT_RESPONDING", "OTHER")'),
      comments: z.string().optional().describe('Optional comment explaining the escalation'),
    },
    annotations: { readOnlyHint: false },
  },

  // Case Write Actions
  {
    name: 'ebay_provide_case_shipment_info',
    description:
      'Provide shipment tracking info for a case to prove item was shipped.\n' +
      'Can help resolve escalated cases if tracking confirms delivery.',
    inputSchema: {
      caseId: z.string().describe('The unique case ID'),
      trackingNumber: z.string().describe('The shipment tracking number'),
      shippingCarrierName: z.string().describe('The shipping carrier (e.g., "DHL", "Deutsche Post")'),
      comments: z.string().optional().describe('Optional comment'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_issue_case_refund',
    description:
      'Issue a refund for a case. Resolves the case in favor of the buyer.\n\n' +
      'CAUTION: This immediately refunds the buyer. Cannot be undone.',
    inputSchema: {
      caseId: z.string().describe('The unique case ID'),
      comments: z.string().optional().describe('Optional comment explaining the refund'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_appeal_case',
    description:
      'Appeal a case decision. Use when you believe the case was resolved incorrectly.\n' +
      'Only possible if the case is eligible for appeal (check appealDetails.eligibleForAppeal).',
    inputSchema: {
      caseId: z.string().describe('The unique case ID'),
      appealReason: z.string().describe('Reason for appeal'),
      comments: z.string().optional().describe('Detailed explanation for the appeal'),
    },
    annotations: { readOnlyHint: false },
  },

  // Return Write Actions
  {
    name: 'ebay_issue_return_refund',
    description:
      'Issue a refund for a return request. Can be full or partial.\n' +
      'If no refundAmount is provided, issues the full estimated refund.\n\n' +
      'CAUTION: This immediately refunds the buyer.',
    inputSchema: {
      returnId: z.string().describe('The unique return ID'),
      comments: z.string().optional().describe('Optional comment'),
      refundAmount: z
        .object({
          value: z.number().describe('Refund amount (e.g., 9.99)'),
          currency: z.string().describe('Currency code (e.g., "EUR")'),
        })
        .optional()
        .describe('Optional: specify for partial refund. Omit for full refund.'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_mark_return_received',
    description:
      'Mark a return as received — confirm that the buyer sent the item back and you received it.\n' +
      'Typically followed by issuing a refund.',
    inputSchema: {
      returnId: z.string().describe('The unique return ID'),
      comments: z.string().optional().describe('Optional comment'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_mark_return_replacement_shipped',
    description:
      'Mark that a replacement item has been shipped to the buyer.\n' +
      'Use when you agreed to send a replacement instead of a refund.',
    inputSchema: {
      returnId: z.string().describe('The unique return ID'),
      trackingNumber: z.string().optional().describe('Tracking number for the replacement shipment'),
      shippingCarrierName: z.string().optional().describe('Shipping carrier name'),
      comments: z.string().optional().describe('Optional comment'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_send_return_message',
    description:
      'Send a message within a return context to communicate with the buyer.\n\n' +
      'CAUTION: This sends a visible message to the buyer.',
    inputSchema: {
      returnId: z.string().describe('The unique return ID'),
      message: z.string().describe('The message text to send'),
    },
    annotations: { readOnlyHint: false },
  },
  {
    name: 'ebay_close_return',
    description:
      'Close a return request. Use when resolved outside the normal eBay flow.\n' +
      'Requires a valid close reason.',
    inputSchema: {
      returnId: z.string().describe('The unique return ID'),
      closeReason: z.string().describe('Reason for closing (e.g., "BUYER_NO_RETURN", "RESOLVED_OUTSIDE_EBAY")'),
      comments: z.string().optional().describe('Optional explanation'),
    },
    annotations: { readOnlyHint: false },
  },
];
