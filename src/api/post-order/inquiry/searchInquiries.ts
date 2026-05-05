import { EbayApiClient } from '../../client.js';
import {
  SearchInquiriesParams,
  InquirySearchResponse,
} from '../../../types/post-order/inquiry/index.js';

export const searchInquiries = async (
  client: EbayApiClient,
  params: SearchInquiriesParams,
): Promise<InquirySearchResponse> => {
  return client.getWithTokenAuth<InquirySearchResponse>('/post-order/v2/inquiry/search', params as unknown as Record<string, unknown>);
};
