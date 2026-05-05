import { z } from 'zod';
import {
  amountSchema,
  dateTimeSchema,
  paginationOutputSchema,
} from '../../common.js';

export const SearchInquiriesParamsSchema = z.object({
  fieldgroups: z.string().optional(),
  inquiry_creation_date_from: z.string().optional(),
  inquiry_creation_date_to: z.string().optional(),
  inquiry_status: z.string().optional(),
  item_id: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
  order_id: z.string().optional(),
  sort: z.string().optional(),
  transaction_id: z.string().optional(),
});

const InquirySummarySchema = z.object({
  claimAmount: amountSchema.optional(),
  creationDate: dateTimeSchema.optional(),
  inquiryId: z.string().optional(),
  inquiryStatus: z.string().optional(),
  inquiryStatusEnum: z.string().optional(),
  itemId: z.string().optional(),
  lastModifiedDate: dateTimeSchema.optional(),
  respondByDate: dateTimeSchema.optional(),
  sellerUserId: z.string().optional(),
  transactionId: z.string().optional(),
  userId: z.string().optional(),
});

export const InquirySearchResponseSchema = z.object({
  href: z.string().optional(),
  inquiries: z.array(InquirySummarySchema).optional(),
  limit: z.number().int().optional(),
  next: z.string().optional(),
  offset: z.number().int().optional(),
  paginationOutput: paginationOutputSchema.optional(),
  prev: z.string().optional(),
  total: z.number().int().optional(),
  warnings: z.array(z.any()).optional(),
});
