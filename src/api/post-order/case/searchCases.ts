
import { EbayApiClient } from '../../client.js';
import { SearchCasesParams, CaseSearchResponse } from '../../../types/post-order/case/index.js';

export const searchCases = async (client: EbayApiClient, params: SearchCasesParams): Promise<CaseSearchResponse> => {
    const { data }: any = await client.get('/post-order/v2/casemanagement/search', {
        params: {
            query: params
        }
    });

    return data;
}
