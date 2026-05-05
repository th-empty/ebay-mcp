import { EbayApiClient } from '../../client.js';
import {
  SearchInquiriesParams,
  InquirySearchResponse,
} from '../../../types/post-order/inquiry/index.js';

export const searchInquiries = async (
  client: EbayApiClient,
  params: SearchInquiriesParams,
): Promise<InquirySearchResponse> => {
  const { data }: any = await client.get('/post-order/v2/inquiry/search', {
    params,
  });

  return data;
};
