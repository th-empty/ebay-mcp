import { EbayApiClient } from '../../client.js';

/**
 * Post-Order API v2 - Return Write Actions
 * All use TOKEN auth scheme via postWithTokenAuth
 *
 * IMPORTANT: All text fields (message, comments) use the eBay Text type:
 * { content: string, language?: string }
 */

/**
 * Issue a refund for a return (full or partial).
 */
export const issueReturnRefund = async (
  client: EbayApiClient,
  params: {
    returnId: string;
    comments?: string;
    refundAmount?: { value: number; currency: string };
  },
): Promise<unknown> => {
  const { returnId, comments, refundAmount } = params;
  const body: Record<string, unknown> = {};
  if (comments) body.comments = { content: comments };
  if (refundAmount) body.refundAmount = refundAmount;
  return client.postWithTokenAuth(
    `/post-order/v2/return/${returnId}/issue_refund`,
    body
  );
};

/**
 * Mark a return as received (seller received the item back).
 */
export const markReturnReceived = async (
  client: EbayApiClient,
  params: { returnId: string; comments?: string },
): Promise<unknown> => {
  const { returnId, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/return/${returnId}/mark_as_received`,
    { ...(comments ? { comments: { content: comments } } : {}) }
  );
};

/**
 * Mark a replacement as shipped for a return.
 */
export const markReturnReplacementShipped = async (
  client: EbayApiClient,
  params: {
    returnId: string;
    trackingNumber?: string;
    shippingCarrierName?: string;
    comments?: string;
  },
): Promise<unknown> => {
  const { returnId, trackingNumber, shippingCarrierName, comments } = params;
  const body: Record<string, unknown> = {};
  if (trackingNumber) body.trackingNumber = trackingNumber;
  if (shippingCarrierName) body.shippingCarrierName = shippingCarrierName;
  if (comments) body.comments = { content: comments };
  return client.postWithTokenAuth(
    `/post-order/v2/return/${returnId}/mark_replacement_shipped`,
    body
  );
};

/**
 * Send a message within a return context.
 */
export const sendReturnMessage = async (
  client: EbayApiClient,
  params: { returnId: string; message: string },
): Promise<unknown> => {
  const { returnId, message } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/return/${returnId}/send_message`,
    { message: { content: message } }
  );
};

/**
 * Close a return request (e.g., when resolved outside eBay flow).
 */
export const closeReturn = async (
  client: EbayApiClient,
  params: { returnId: string; closeReason: string; comments?: string },
): Promise<unknown> => {
  const { returnId, closeReason, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/return/${returnId}/close`,
    {
      closeReason,
      ...(comments ? { comments: { content: comments } } : {}),
    }
  );
};
