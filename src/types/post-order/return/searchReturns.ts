import { z } from 'zod';
import {
  SearchReturnParamsSchema,
  ReturnSearchResponseSchema,
} from '../../../schemas/post-order/return/searchReturns.js';

export type SearchReturnParams = z.infer<typeof SearchReturnParamsSchema>;

export type ReturnSearchResponse = z.infer<
  typeof ReturnSearchResponseSchema
>;
