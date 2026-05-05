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
  return client.get(`/post-order/v2/return/${returnId}`, {
    params: rest,
  });
};
