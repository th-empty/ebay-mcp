import { z } from 'zod';
import {
  amountSchema,
  dateTimeSchema,
  errorDataSchema,
  paginationOutputSchema,
  textSchema,
} from '../../common.js';

export const SearchReturnParamsSchema = z.object({
  creation_date_from: z.string().optional(),
  creation_date_to: z.string().optional(),
  item_id: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
  order_id: z.string().optional(),
  return_state: z.string().optional(),
  seller_login_name: z.string().optional(),
  sort: z.string().optional(),
  transaction_id: z.string().optional(),
});

const ReturnStateInfoSchema = z.object({
  buyerCurrentDue: z.string().optional(),
  buyerPreviousDue: z.string().optional(),
  currentDue: z.string().optional(),
  previousDue: z.string().optional(),
  respondByDate: dateTimeSchema.optional(),
  sellerCurrentDue: z.string().optional(),
  sellerPreviousDue: z.string().optional(),
});

const RefundStatusInfoSchema = z.object({
  actualRefundAmount: amountSchema.optional(),
  estimatedRefundAmount: amountSchema.optional(),
  refundStatus: z.string().optional(),
});

const ResponseDetailSchema = z.object({
  comments: textSchema.optional(),
  creationDate: dateTimeSchema.optional(),
  responseType: z.string().optional(),
});

const ActivityOptionSchema = z.object({
  description: z.string().optional(),
  name: z.string().optional(),
});

const AvailableOptionSchema = z.object({
  activityOptions: z.array(ActivityOptionSchema).optional(),
  endTime: dateTimeSchema.optional(),
  startTime: dateTimeSchema.optional(),
});

const ReturnSummarySchema = z.object({
  buyerDetails: z.any().optional(),
  creationInfo: z.any().optional(),
  currentRefundStatusInfo: RefundStatusInfoSchema.optional(),
  escalationInfo: z.any().optional(),
  itemDetails: z.array(z.any()).optional(),
  moneyMovementInfo: z.array(z.any()).optional(),
  replacementShipmentInfo: z.any().optional(),
  responseHistory: z.array(ResponseDetailSchema).optional(),
  returnId: z.string().optional(),
  returnPolicy: z.any().optional(),
  returnStateInfo: ReturnStateInfoSchema.optional(),
  sellerAvailableOptions: z.array(AvailableOptionSchema).optional(),
  sellerResponseDue: z.any().optional(),
  shipmentInfo: z.any().optional(),
  timeoutDate: dateTimeSchema.optional(),
});

export const ReturnSearchResponseSchema = z.object({
  href: z.string().optional(),
  limit: z.number().int().optional(),
  members: z.array(ReturnSummarySchema).optional(),
  next: z.string().optional(),
  offset: z.number().int().optional(),
  paginationOutput: paginationOutputSchema.optional(),
  prev: z.string().optional(),
  total: z.number().int().optional(),
  warnings: z.array(errorDataSchema).optional(),
  errors: z.array(errorDataSchema).optional(),
});
