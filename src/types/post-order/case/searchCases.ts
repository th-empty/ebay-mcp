
export type SearchCasesParams = {
    case_creation_date_range_from?: string;
    case_creation_date_range_to?: string;
    case_status_filter?: string;
    fieldgroups?: string;
    item_id?: string;
    limit?: number;
    offset?: number;
    order_id?: string;
    return_id?: string;
    sort?: string;
    transaction_id?: string;
};

export type CaseSearchResponse = {
    members?: {
        buyer?: string;
        caseId?: number;
        caseStatusEnum?: string;
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
        itemId?: number;
        lastModifiedDate?: {
            formattedValue?: string;
            value?: string;
        };
        respondByDate?: {
            formattedValue?: string;
            value?: string;
        };
        seller?: string;
        transactionId?: number;
    }[];
    paginationOutput?: {
        limit?: number;
        offset?: number;
        totalEntries?: number;
        totalPages?: number;
    };
    totalNumberOfCases?: number;
};
