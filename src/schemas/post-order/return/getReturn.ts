import { z } from 'zod';
import {
  addressSchema,
  amountSchema,
  dateTimeSchema,
  errorDataSchema,
  textSchema,
} from '../../common.js';

export const GetReturnParamsSchema = z.object({
  returnId: z.string(),
});

const ReturnAddressSchema = z.object({
  address: addressSchema.optional(),
  addressType: z.string().optional(),
  comments: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  RMA: z.string().optional(),
});

const BuyerDetailSchema = z.object({
  loginName: z.string().optional(),
  returnCloseDate: dateTimeSchema.optional(),
});

const ReturnPolicySchema = z.object({
  returnMethod: z.string().optional(),
});

const ReturnCreationInfoSchema = z.object({
  creationDate: dateTimeSchema.optional(),
  itemizedRefundDetail: z.array(z.any()).optional(),
  requestType: z.string().optional(),
  returnReason: z.string().optional(),
  returnReasonDescription: z.string().optional(),
  sellerResponse: z.string().optional(),
});

const HoldDetailSchema = z.object({
  holdCreationDate: dateTimeSchema.optional(),
  holdReason: z.string().optional(),
  holdReleaseDate: dateTimeSchema.optional(),
  holdStatus: z.string().optional(),
});

const ItemDetailSchema = z.object({
  image: z.string().optional(),
  itemId: z.string().optional(),
  itemPrice: amountSchema.optional(),
  quantity: z.number().int().optional(),
  returnQuantity: z.number().int().optional(),
  title: z.string().optional(),
  transactionId: z.string().optional(),
  transactionDate: dateTimeSchema.optional(),
});

const RefundInfoSchema = z.object({
  actualAmount: amountSchema.optional(),
  creationDate: dateTimeSchema.optional(),
  itemizedRefundDetail: z.array(z.any()).optional(),
  refundStatus: z.string().optional(),
  requestedAmount: amountSchema.optional(),
});

const RecoupmentInfoSchema = z.object({
  amountToRecoup: amountSchema.optional(),
  recoupmentStatus: z.string().optional(),
});

const TotalRefundAmountSchema = z.object({
  refundAmount: amountSchema.optional(),
  currencyUnit: z.string().optional(),
});

const RefundDetailSchema = z.object({
  donationAmount: amountSchema.optional(),
  feeCreditAmount: amountSchema.optional(),
  itemizedRefunds: z.array(z.any()).optional(),
  totalAmount: amountSchema.optional(),
});

const MoneyMovementDetailSchema = z.object({
  amount: amountSchema.optional(),
  date: dateTimeSchema.optional(),
  from: z.string().optional(),
  id: z.string().optional(),
  status: z.string().optional(),
  to: z.string().optional(),
  type: z.string().optional(),
});

const PaymentHoldDetailSchema = z.object({
  netChargeAmount: amountSchema.optional(),
  outstandingAmount: amountSchema.optional(),
  paymentHoldStatus: z.string().optional(),
  refundIssuedDate: dateTimeSchema.optional(),
});

const RefundFeeSchema = z.object({
  estimatedAmount: amountSchema.optional(),
  feeType: z.string().optional(),
  maxAmount: amountSchema.optional(),
  minAmount: amountSchema.optional(),
});

const ShipmentInfoSchema = z.object({
  actualDeliveryDate: dateTimeSchema.optional(),
  actualShipDate: dateTimeSchema.optional(),
  carrierEnum: z.string().optional(),
  carrierName: z.string().optional(),
  carrierUsed: z.string().optional(),
  deliveryDate: dateTimeSchema.optional(),
  fromAddress: ReturnAddressSchema.optional(),
  labelCost: z.any().optional(),
  labelDate: dateTimeSchema.optional(),
  labelId: z.string().optional(),
  labelType: z.string().optional(),
  maxDeliveryEstimate: dateTimeSchema.optional(),
  minDeliveryEstimate: dateTimeSchema.optional(),
  returnShipmentType: z.string().optional(),
  shipDate: dateTimeSchema.optional(),
  shipmentStatus: z.string().optional(),
  shippingLabelCost: z.any().optional(),
  toAddress: ReturnAddressSchema.optional(),
  trackingNumber: z.string().optional(),
});

const ReplacementShipmentInfoSchema = z.object({
  amount: amountSchema.optional(),
  carrierUsed: z.string().optional(),
  deliveryDate: z.string().optional(),
  rmaNumber: z.string().optional(),
  shipmentStatus: z.string().optional(),
  trackingNumber: z.string().optional(),
});

const TotalAmountSchema = z.object({
  totalAmount: amountSchema.optional(),
  currencyUnit: z.string().optional(),
});

const ReturnFileSchema = z.object({
  fileId: z.string().optional(),
  filePurpose: z.string().optional(),
  uploadDate: z.string().optional(),
});

const RefundDeductionSchema = z.object({
  amount: z.any().optional(),
  deductionType: z.string().optional(),
  refundDeductionAmount: amountSchema.optional(),
});

const PartialRefundSchema = z.object({
  amount: z.any().optional(),
  partialRefundAmount: amountSchema.optional(),
});

const EscalationInfoSchema = z.object({
  buyer: z.any().optional(),
  creationDate: dateTimeSchema.optional(),
  escalationReason: z.string().optional(),
  escalationStatus: z.string().optional(),
  seller: z.any().optional(),
});

const AppealDetailsSchema = z.object({
  appealCloseReason: z.string().optional(),
  appealCreationDate: z.string().optional(),
  appealId: z.string().optional(),
  appealStatus: z.string().optional(),
  eligibleForAppeal: z.boolean().optional(),
});

const ReturnResponseHistorySchema = z.object({
  activity: z.string().optional(),
  author: z.string().optional(),
  creationDate: z.string().optional(),
  notes: z.string().optional(),
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

const ActivityOptionSchema = z.object({
  description: z.string().optional(),
  name: z.string().optional(),
});

const ResponseDetailSchema = z.object({
  comments: textSchema.optional(),
  creationDate: dateTimeSchema.optional(),
  responseType: z.string().optional(),
});

const AvailableOptionSchema = z.object({
  activityOptions: z.array(ActivityOptionSchema).optional(),
  endTime: dateTimeSchema.optional(),
  startTime: dateTimeSchema.optional(),
});

export const ReturnDetailsResponseSchema = z.object({
  buyerDetails: BuyerDetailSchema.optional(),
  creationInfo: ReturnCreationInfoSchema.optional(),
  currentRefundStatusInfo: RefundStatusInfoSchema.optional(),
  escalationInfo: EscalationInfoSchema.optional(),
  holdDetails: z.array(HoldDetailSchema).optional(),
  itemDetails: z.array(ItemDetailSchema).optional(),
  moneyMovementInfo: z.array(MoneyMovementDetailSchema).optional(),
  partialRefunds: z.array(PartialRefundSchema).optional(),
  paymentHoldDetails: z.array(PaymentHoldDetailSchema).optional(),
  refundDeductions: z.array(RefundDeductionSchema).optional(),
  refundInfo: RefundInfoSchema.optional(),
  replacementShipmentInfo: ReplacementShipmentInfoSchema.optional(),
  responseHistory: z.array(ReturnResponseHistorySchema).optional(),
  returnId: z.string().optional(),
  returnPolicy: ReturnPolicySchema.optional(),
  returnStateInfo: ReturnStateInfoSchema.optional(),
  sellerAvailableOptions: z.array(AvailableOptionSchema).optional(),
  sellerResponseDue: z.any().optional(),
  shipmentInfo: ShipmentInfoSchema.optional(),
  timeoutDate: dateTimeSchema.optional(),
  warnings: z.array(z.any()).optional(),
  errors: z.array(errorDataSchema).optional(),
});
