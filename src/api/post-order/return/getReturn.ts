import { EbayApiClient } from '../../client.js';
import {
  GetReturnParams,
  ReturnDetailsResponse,
} from '../../../types/post-order/return/index.js';

export const getReturn = async (
  client: EbayApiClient,
  params: GetReturnParams,
): Promise<ReturnDetailsResponse> => {
  const { returnId, ...rest } = params;
  const queryParams = Object.keys(rest).length > 0 ? (rest as unknown as Record<string, unknown>) : undefined;
  return client.getWithTokenAuth<ReturnDetailsResponse>(`/post-order/v2/return/${returnId}`, queryParams);
};
