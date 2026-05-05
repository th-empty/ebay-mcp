import { z } from 'zod';
import {
  SearchInquiriesParamsSchema,
  InquirySearchResponseSchema,
} from '../../../schemas/post-order/inquiry/searchInquiries.js';

export type SearchInquiriesParams = z.infer<typeof SearchInquiriesParamsSchema>;
export type InquirySearchResponse = z.infer<
  typeof InquirySearchResponseSchema
>;
