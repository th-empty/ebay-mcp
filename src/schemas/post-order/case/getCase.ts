
import { z } from 'zod';

export const GetCaseParamsSchema = z.object({
  caseId: z.string(),
});

export const CaseDetailsResponseSchema = z.object({
    actionDeadlines: z.object({
        daysForBuyerToProvideProofOfShipment: z.number().optional(),
        daysToExpireWithoutResponse: z.number().optional(),
        daysToExpireWithResponse: z.number().optional(),
        daysToReturnItem: z.number().optional(),
        maxDaysToFileClaim: z.number().optional(),
    }).optional(),
    appealDetails: z.object({
        appealCloseReasonEnum: z.string().optional(),
        appealDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        appealReasonCode: z.string().optional(),
        appealRefundAmount: z.object({
            convertedFromCurrency: z.string().optional(),
            convertedFromValue: z.number().optional(),
            currency: z.string().optional(),
            exchangeRate: z.string().optional(),
            value: z.number().optional(),
        }).optional(),
        appealStatus: z.string().optional(),
        appealStatusEnum: z.string().optional(),
        eligibleForAppeal: z.boolean().optional(),
    }).optional(),
    buyerClosureReason: z.string().optional(),
    buyerProtectedProgramLink: z.string().optional(),
    caseContentOnHold: z.boolean().optional(),
    caseDetails: z.object({
        buyerFinalAcceptResolution: z.string().optional(),
        buyerInitExpectResolution: z.string().optional(),
        creationDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        escalationDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        expirationDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        lastBuyerRespDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        lastSellerRespDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        paypalPaid: z.boolean().optional(),
        refundAmounts: z.object({
            buyerFinalAcceptRefundAmt: z.object({
                convertedFromCurrency: z.string().optional(),
                convertedFromValue: z.number().optional(),
                currency: z.string().optional(),
                exchangeRate: z.string().optional(),
                value: z.number().optional(),
            }).optional(),
            buyerInitExpectRefundAmt: z.object({
                convertedFromCurrency: z.string().optional(),
                convertedFromValue: z.number().optional(),
                currency: z.string().optional(),
                exchangeRate: z.string().optional(),
                value: z.number().optional(),
            }).optional(),
            donationAmount: z.object({
                convertedFromCurrency: z.string().optional(),
                convertedFromValue: z.number().optional(),
                currency: z.string().optional(),
                exchangeRate: z.string().optional(),
                value: z.number().optional(),
            }).optional(),
            feeCreditAmount: z.object({
                convertedFromCurrency: z.string().optional(),
                convertedFromValue: z.number().optional(),
                currency: z.string().optional(),
                exchangeRate: z.string().optional(),
                value: z.number().optional(),
            }).optional(),
            internationalRefundAmount: z.object({
                convertedFromCurrency: z.string().optional(),
                convertedFromValue: z.number().optional(),
                currency: z.string().optional(),
                exchangeRate: z.string().optional(),
                value: z.number().optional(),
            }).optional(),
            refundAmount: z.object({
                convertedFromCurrency: z.string().optional(),
                convertedFromValue: z.number().optional(),
                currency: z.string().optional(),
                exchangeRate: z.string().optional(),
                value: z.number().optional(),
            }).optional(),
        }).optional(),
        refundChargeAmount: z.object({
            convertedFromCurrency: z.string().optional(),
            convertedFromValue: z.number().optional(),
            currency: z.string().optional(),
            exchangeRate: z.string().optional(),
            value: z.number().optional(),
        }).optional(),
        refundDeadlineDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        refundType: z.string().optional(),
    }).optional(),
    caseHistoryDetails: z.object({
        history: z.array(z.object({
            action: z.string().optional(),
            actor: z.string().optional(),
            date: z.object({
                formattedValue: z.string().optional(),
                value: z.string().optional(),
            }).optional(),
            description: z.string().optional(),
            moneyMovement: z.object({
                moneyMovementEntryList: z.array(z.object({
                    amount: z.object({
                        convertedFromCurrency: z.string().optional(),
                        convertedFromValue: z.number().optional(),
                        currency: z.string().optional(),
                        exchangeRate: z.string().optional(),
                        value: z.number().optional(),
                    }).optional(),
                    date: z.object({
                        formattedValue: z.string().optional(),
                        value: z.string().optional(),
                    }).optional(),
                    fundingSource: z.object({
                        brand: z.string().optional(),
                        memo: z.string().optional(),
                        type: z.string().optional(),
                    }).optional(),
                    fundingStatus: z.string().optional(),
                    type: z.string().optional(),
                })).optional(),
            }).optional(),
        })).optional(),
        shipmentTrackingDetails: z.object({
            carrier: z.string().optional(),
            currentStatus: z.string().optional(),
            estimateFromDate: z.object({
                formattedValue: z.string().optional(),
                value: z.string().optional(),
            }).optional(),
            estimateToDate: z.object({
                formattedValue: z.string().optional(),
                value: z.string().optional(),
            }).optional(),
            trackingNumber: z.string().optional(),
            trackingURL: z.string().optional(),
        }).optional(),
    }).optional(),
    caseId: z.string().optional(),
    caseQuantity: z.number().optional(),
    caseType: z.string().optional(),
    claimAmount: z.object({
        convertedFromCurrency: z.string().optional(),
        convertedFromValue: z.number().optional(),
        currency: z.string().optional(),
        exchangeRate: z.string().optional(),
        value: z.number().optional(),
    }).optional(),
    creationDate: z.object({
        formattedValue: z.string().optional(),
        value: z.string().optional(),
    }).optional(),
    escalatedBy: z.string().optional(),
    escalateReason: z.string().optional(),
    eventTicketsLink: z.string().optional(),
    extTransactionId: z.string().optional(),
    fsnadDaysToAddTrackingAfterShippingItem: z.number().optional(),
    fsnadShipToSellerByDate: z.object({
        formattedValue: z.string().optional(),
        value: z.string().optional(),
    }).optional(),
    initiator: z.string().optional(),
    itemId: z.string().optional(),
    itemOnHold: z.boolean().optional(),
    lastModifiedDate: z.object({
        formattedValue: z.string().optional(),
        value: z.string().optional(),
    }).optional(),
    payForItemLink: z.string().optional(),
    priceSignatureConfirmationAmount: z.string().optional(),
    recalledItemLink: z.string().optional(),
    returnDetails: z.object({
        address: z.object({
            addressLine1: z.string().optional(),
            addressLine2: z.string().optional(),
            addressType: z.string().optional(),
            city: z.string().optional(),
            country: z.string().optional(),
            county: z.string().optional(),
            isTransliterated: z.boolean().optional(),
            nationalRegion: z.string().optional(),
            postalCode: z.string().optional(),
            script: z.string().optional(),
            stateOrProvince: z.string().optional(),
            transliteratedFromScript: z.string().optional(),
            worldRegion: z.string().optional(),
        }).optional(),
        editable: z.boolean().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        RMA: z.string().optional(),
    }).optional(),
    returnId: z.string().optional(),
    sellerClosureReason: z.string().optional(),
    shippingFee: z.object({
        convertedFromCurrency: z.string().optional(),
        convertedFromValue: z.number().optional(),
        currency: z.string().optional(),
        exchangeRate: z.string().optional(),
        value: z.number().optional(),
    }).optional(),
    status: z.string().optional(),
    transactionId: z.string().optional(),
});

export type GetCaseParams = z.infer<typeof GetCaseParamsSchema>;
export type CaseDetailsResponse = z.infer<typeof CaseDetailsResponseSchema>;
