import { z } from 'zod';
import {
  GetInquiryParamsSchema,
  InquiryResponseSchema,
} from '../../../schemas/post-order/inquiry/getInquiry.js';

export type GetInquiryParams = z.infer<typeof GetInquiryParamsSchema>;
export type InquiryResponse = z.infer<typeof InquiryResponseSchema>;
