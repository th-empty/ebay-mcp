import { EbayApiClient } from '../../client.js';

/**
 * Post-Order API v2 - Case Write Actions
 * All use TOKEN auth scheme via postWithTokenAuth
 *
 * IMPORTANT: All text fields (comments) use the eBay Text type:
 * { content: string, language?: string }
 */

/**
 * Provide shipment tracking info for a case.
 */
export const provideCaseShipmentInfo = async (
  client: EbayApiClient,
  params: {
    caseId: string;
    trackingNumber: string;
    shippingCarrierName: string;
    comments?: string;
  },
): Promise<unknown> => {
  const { caseId, trackingNumber, shippingCarrierName, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/casemanagement/${caseId}/provide_shipment_info`,
    {
      shippingCarrierName,
      trackingNumber,
      ...(comments ? { comments: { content: comments } } : {}),
    }
  );
};

/**
 * Issue a refund for a case.
 */
export const issueCaseRefund = async (
  client: EbayApiClient,
  params: { caseId: string; comments?: string },
): Promise<unknown> => {
  const { caseId, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/casemanagement/${caseId}/issue_refund`,
    { ...(comments ? { comments: { content: comments } } : {}) }
  );
};

/**
 * Appeal a case decision.
 */
export const appealCase = async (
  client: EbayApiClient,
  params: { caseId: string; appealReason: string; comments?: string },
): Promise<unknown> => {
  const { caseId, appealReason, comments } = params;
  return client.postWithTokenAuth(
    `/post-order/v2/casemanagement/${caseId}/appeal`,
    {
      appealReason,
      ...(comments ? { comments: { content: comments } } : {}),
    }
  );
};
