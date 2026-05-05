
import { z } from 'zod';

export const SearchCasesParamsSchema = z.object({
    case_creation_date_range_from: z.string().optional(),
    case_creation_date_range_to: z.string().optional(),
    case_status_filter: z.string().optional(),
    fieldgroups: z.string().optional(),
    item_id: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    order_id: z.string().optional(),
    return_id: z.string().optional(),
    sort: z.string().optional(),
    transaction_id: z.string().optional(),
});

export const CaseSearchResponseSchema = z.object({
    members: z.array(z.object({
        buyer: z.string().optional(),
        caseId: z.number().optional(),
        caseStatusEnum: z.string().optional(),
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
        itemId: z.number().optional(),
        lastModifiedDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        respondByDate: z.object({
            formattedValue: z.string().optional(),
            value: z.string().optional(),
        }).optional(),
        seller: z.string().optional(),
        transactionId: z.number().optional(),
    })).optional(),
    paginationOutput: z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        totalEntries: z.number().optional(),
        totalPages: z.number().optional(),
    }).optional(),
    totalNumberOfCases: z.number().optional(),
});

export type SearchCasesParams = z.infer<typeof SearchCasesParamsSchema>;
export type CaseSearchResponse = z.infer<typeof CaseSearchResponseSchema>;
