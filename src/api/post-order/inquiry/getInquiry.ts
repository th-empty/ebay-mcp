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
  const { data }: any = await client.get(
    `/post-order/v2/inquiry/${inquiryId}`,
  );

  return data;
};
