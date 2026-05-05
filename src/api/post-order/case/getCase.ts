
import { EbayApiClient } from '../../client.js';
import { GetCaseParams, CaseDetailsResponse } from '../../../types/post-order/case/index.js';

export const getCase = async (client: EbayApiClient, params: GetCaseParams): Promise<CaseDetailsResponse> => {
    const { caseId } = params;

    const { data }: any = await client.get('/post-order/v2/casemanagement/{caseId}', {
        params: {
            path: {
                caseId,
            }
        }
    });

    return data;
}
