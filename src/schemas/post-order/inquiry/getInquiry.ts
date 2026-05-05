import { z } from 'zod';
import {
  amountSchema,
  dateTimeSchema,
  addressSchema,
} from '../../common.js';

export const GetInquiryParamsSchema = z.object({
  inquiryId: z.string(),
});

const AppealDetailsSchema = z.object({
  appealCloseReasonEnum: z.string().optional(),
  appealDate: dateTimeSchema.optional(),
  appealReasonCode: z.string().optional(),
  appealRefundAmount: amountSchema.optional(),
  appealStatus: z.string().optional(),
  appealStatusEnum: z.string().optional(),
  eligibleForAppeal: z.boolean().optional(),
});

const InquiryDetailsSchema = z.object({
  buyerFinalAcceptRefundAmt: amountSchema.optional(),
  buyerInitExpectRefundAmt: amountSchema.optional(),
  donationAmount: amountSchema.optional(),
  feeCreditAmount: amountSchema.optional(),
  internationalRefundAmount: amountSchema.optional(),
  refundAmount: amountSchema.optional(),
  inquiryState: z.string().optional(),
  inquiryStatus: z.string().optional(),
  inquiryStatusEnum: z.string().optional(),
  creationDate: dateTimeSchema.optional(),
  escalationDate: dateTimeSchema.optional(),
  expirationDate: dateTimeSchema.optional(),
  lastBuyerRespDate: dateTimeSchema.optional(),
  inquiryType: z.string().optional(),
  refundChargeAmount: amountSchema.optional(),
  refundDeadlineDate: dateTimeSchema.optional(),
  totalAmount: amountSchema.optional(),
  userId: z.string().optional(),
});

const MoneyMovementDetailSchema = z.object({
  amount: amountSchema.optional(),
  date: dateTimeSchema.optional(),
  id: z.string().optional(),
  payer: z.string().optional(),
  payee: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
});

const PostSaleDetailSchema = z.object({
  date: dateTimeSchema.optional(),
  name: z.string().optional(),
  value: z.string().optional(),
});

const ShipmentTrackingDetailsSchema = z.object({
  carrierEnum: z.string().optional(),
  carrierName: z.string().optional(),
  estimateFromDate: dateTimeSchema.optional(),
  estimateToDate: dateTimeSchema.optional(),
  trackingNumber: z.string().optional(),
});

const ItemDetailsSchema = z.object({
  itemId: z.string().optional(),
  itemPrice: amountSchema.optional(),
  quantity: z.number().int().optional(),
  restockingFeePercentage: z.string().optional(),
  title: z.string().optional(),
  transactionId: z.string().optional(),
});

const ReturnAddressSchema = z.object({
  address: addressSchema.optional(),
  addressType: z.string().optional(),
  comments: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  RMA: z.string().optional(),
});

export const InquiryResponseSchema = z.object({
  appealDetails: AppealDetailsSchema.optional(),
  claimAmount: amountSchema.optional(),
  inquiryDetails: InquiryDetailsSchema.optional(),
  inquiryId: z.string().optional(),
  inquiryClosureDate: dateTimeSchema.optional(),
  inquiryUrl: z.string().optional(),
  itemDetails: ItemDetailsSchema.optional(),
  moneyMovementDetails: z.array(MoneyMovementDetailSchema).optional(),
  postSaleDetails: z.array(PostSaleDetailSchema).optional(),
  returnDetails: ReturnAddressSchema.optional(),
  sellerMakeItRightByDate: dateTimeSchema.optional(),
  shippingCost: amountSchema.optional(),
  shipmentTrackingDetails: z.array(ShipmentTrackingDetailsSchema).optional(),
  transactionDetails: z.object({}).optional(),
});
