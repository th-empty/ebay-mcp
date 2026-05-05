import { EbayApiClient } from '../../client.js';
import {
  GetInquiryParams,
  InquiryResponse,
} from '../../../types/post-order/inquiry/index.js';

export const getInquiry = async (
  client: EbayApiClient,
  params: GetInquiryParams,
): Promise<InquiryResponse> => {
  const { inquiryId } = params;
  return client.getWithTokenAuth<InquiryResponse>(`/post-order/v2/inquiry/${inquiryId}`);
};
