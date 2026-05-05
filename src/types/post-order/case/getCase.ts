
export type GetCaseParams = {
    caseId: string;
};

export type CaseDetailsResponse = {
    actionDeadlines?: {
        daysForBuyerToProvideProofOfShipment?: number;
        daysToExpireWithoutResponse?: number;
        daysToExpireWithResponse?: number;
        daysToReturnItem?: number;
        maxDaysToFileClaim?: number;
    };
    appealDetails?: {
        appealCloseReasonEnum?: string;
        appealDate?: {
            formattedValue?: string;
            value?: string;
        };
        appealReasonCode?: string;
        appealRefundAmount?: {
            convertedFromCurrency?: string;
            convertedFromValue?: number;
            currency?: string;
            exchangeRate?: string;
            value?: number;
        };
        appealStatus?: string;
        appealStatusEnum?: string;
        eligibleForAppeal?: boolean;
    };
    buyerClosureReason?: string;
    buyerProtectedProgramLink?: string;
    caseContentOnHold?: boolean;
    caseDetails?: {
        buyerFinalAcceptResolution?: string;
        buyerInitExpectResolution?: string;
        creationDate?: {
            formattedValue?: string;
            value?: string;
        };
        escalationDate?: {
            formattedValue?: string;
            value?: string;
        };
        expirationDate?: {
            formattedValue?: string;
            value?: string;
        };
        lastBuyerRespDate?: {
            formattedValue?: string;
            value?: string;
        };
        lastSellerRespDate?: {
            formattedValue?: string;
            value?: string;
        };
        paypalPaid?: boolean;
        refundAmounts?: {
            buyerFinalAcceptRefundAmt?: {
                convertedFromCurrency?: string;
                convertedFromValue?: number;
                currency?: string;
                exchangeRate?: string;
                value?: number;
            };
            buyerInitExpectRefundAmt?: {
                convertedFromCurrency?: string;
                convertedFromValue?: number;
                currency?: string;
                exchangeRate?: string;
                value?: number;
            };
            donationAmount?: {
                convertedFromCurrency?: string;
                convertedFromValue?: number;
                currency?: string;
                exchangeRate?: string;
                value?: number;
            };
            feeCreditAmount?: {
                convertedFromCurrency?: string;
                convertedFromValue?: number;
                currency?: string;
                exchangeRate?: string;
                value?: number;
            };
            internationalRefundAmount?: {
                convertedFromCurrency?: string;
                convertedFromValue?: number;
                currency?: string;
                exchangeRate?: string;
                value?: number;
            };
            refundAmount?: {
                convertedFromCurrency?: string;
                convertedFromValue?: number;
                currency?: string;
                exchangeRate?: string;
                value?: number;
            };
        };
        refundChargeAmount?: {
            convertedFromCurrency?: string;
            convertedFromValue?: number;
            currency?: string;
            exchangeRate?: string;
            value?: number;
        };
        refundDeadlineDate?: {
            formattedValue?: string;
            value?: string;
        };
        refundType?: string;
    };
    caseHistoryDetails?: {
        history?: {
            action?: string;
            actor?: string;
            date?: {
                formattedValue?: string;
                value?: string;
            };
            description?: string;
            moneyMovement?: {
                moneyMovementEntryList?: {
                    amount?: {
                        convertedFromCurrency?: string;
                        convertedFromValue?: number;
                        currency?: string;
                        exchangeRate?: string;
                        value?: number;
                    };
                    date?: {
                        formattedValue?: string;
                        value?: string;
                    };
                    fundingSource?: {
                        brand?: string;
                        memo?: string;
                        type?: string;
                    };
                    fundingStatus?: string;
                    type?: string;
                }[];
            };
        }[];
        shipmentTrackingDetails?: {
            carrier?: string;
            currentStatus?: string;
            estimateFromDate?: {
                formattedValue?: string;
                value?: string;
            };
            estimateToDate?: {
                formattedValue?: string;
                value?: string;
            };
            trackingNumber?: string;
            trackingURL?: string;
        };
    };
    caseId?: string;
    caseQuantity?: number;
    caseType?: string;
    claimAmount?: {
        convertedFromCurrency?: string;
        convertedFromValue?: number;
        currency?: string;
        exchangeRate?: string;
        value?: number;
    };
    creationDate?: {
        formattedValue?: string;
        value?: string;
    };
    escalatedBy?: string;
    escalateReason?: string;
    eventTicketsLink?: string;
    extTransactionId?: string;
    fsnadDaysToAddTrackingAfterShippingItem?: number;
    fsnadShipToSellerByDate?: {
        formattedValue?: string;
        value?: string;
    };
    initiator?: string;
    itemId?: string;
    itemOnHold?: boolean;
    lastModifiedDate?: {
        formattedValue?: string;
        value?: string;
    };
    payForItemLink?: string;
    priceSignatureConfirmationAmount?: string;
    recalledItemLink?: string;
    returnDetails?: {
        address?: {
            addressLine1?: string;
            addressLine2?: string;
            addressType?: string;
            city?: string;
            country?: string;
            county?: string;
            isTransliterated?: boolean;
            nationalRegion?: string;
            postalCode?: string;
            script?: string;
            stateOrProvince?: string;
            transliteratedFromScript?: string;
            worldRegion?: string;
        };
        editable?: boolean;
        firstName?: string;
        lastName?: string;
        RMA?: string;
    };
    returnId?: string;
    sellerClosureReason?: string;
    shippingFee?: {
        convertedFromCurrency?: string;
        convertedFromValue?: number;
        currency?: string;
        exchangeRate?: string;
        value?: number;
    };
    status?: string;
    transactionId?: string;
};
