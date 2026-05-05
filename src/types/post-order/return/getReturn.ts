import { z } from 'zod';
import {
  GetReturnParamsSchema,
  ReturnDetailsResponseSchema,
} from '../../../schemas/post-order/return/getReturn.js';

export type GetReturnParams = z.infer<typeof GetReturnParamsSchema>;
export type ReturnDetailsResponse = z.infer<
  typeof ReturnDetailsResponseSchema
>;
