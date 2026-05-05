
import { EbayApiClient } from '../../client.js';
import { SearchCasesParams, CaseSearchResponse } from '../../../types/post-order/case/index.js';

export const searchCases = async (client: EbayApiClient, params: SearchCasesParams): Promise<CaseSearchResponse> => {
    return client.getWithTokenAuth<CaseSearchResponse>('/post-order/v2/casemanagement/search', params as unknown as Record<string, unknown>);
}
