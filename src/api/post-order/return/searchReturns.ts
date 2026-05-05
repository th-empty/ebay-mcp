import { EbayApiClient } from '../../client.js';
import {
  SearchReturnParams,
  ReturnSearchResponse,
} from '../../../types/post-order/return/index.js';

export const searchReturns = async (
  client: EbayApiClient,
  params: SearchReturnParams,
): Promise<ReturnSearchResponse> => {
  return client.getWithTokenAuth<ReturnSearchResponse>('/post-order/v2/return/search', params as unknown as Record<string, unknown>);
};
