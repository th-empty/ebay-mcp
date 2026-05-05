import { EbayApiClient } from '../../client.js';

/**
 * Post-Order API v2 - Inquiry Write Actions
 * All use TOKEN auth scheme via postWithTokenAuth/getWithTokenAuth
 *
 * IMPORTANT: All text fields (message, comments) use the eBay Text type:
 * { content: string, language?: string }
 */

/**
 * Send a message/response to a buyer inquiry.
 * This is the "seller offered another solution" action.
 */
export const sendInquiryMessage = async (
  client: EbayApiClient,
  params: { inquiryId: string; message: string },
): Promise<unknown> => {
  const { inquiryId, message } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/inquiry/${inquiryId}/send_message`,
    { message: { content: message } }
  );
};

/**
 * Provide shipment tracking info for an inquiry (proves item was shipped).
 */
export const provideInquiryShipmentInfo = async (
  client: EbayApiClient,
  params: {
    inquiryId: string;
    trackingNumber: string;
    shippingCarrierName: string;
    comments?: string;
  },
): Promise<unknown> => {
  const { inquiryId, trackingNumber, shippingCarrierName, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/inquiry/${inquiryId}/provide_shipment_info`,
    {
      shippingCarrierName,
      trackingNumber,
      ...(comments ? { comments: { content: comments } } : {}),
    }
  );
};

/**
 * Issue a full refund for an inquiry.
 */
export const issueInquiryRefund = async (
  client: EbayApiClient,
  params: { inquiryId: string; comments?: string },
): Promise<unknown> => {
  const { inquiryId, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/inquiry/${inquiryId}/issue_refund`,
    { ...(comments ? { comments: { content: comments } } : {}) }
  );
};

/**
 * Escalate an inquiry to eBay (convert to case).
 * Field name is escalateInquiryReason per eBay API spec.
 */
export const escalateInquiry = async (
  client: EbayApiClient,
  params: { inquiryId: string; escalateReason: string; comments?: string },
): Promise<unknown> => {
  const { inquiryId, escalateReason, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/inquiry/${inquiryId}/escalate`,
    {
      escalateInquiryReason: escalateReason,
      ...(comments ? { comments: { content: comments } } : {}),
    }
  );
};
