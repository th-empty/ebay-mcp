

import { EbayApiClient } from '../client.js';
import { caseManagement } from './case/index.js';
import { inquiryManagement } from './inquiry/index.js';
import { returnManagement } from './return/index.js';

export class PostOrderApi {
    constructor(private client: EbayApiClient) {}

    public readonly caseManagement = {
        getCase: (params: any) => caseManagement.getCase(this.client, params),
        searchCases: (params: any) => caseManagement.searchCases(this.client, params),
    };

    public readonly inquiryManagement = {
        getInquiry: (params: any) => inquiryManagement.getInquiry(this.client, params),
        searchInquiries: (params: any) => inquiryManagement.searchInquiries(this.client, params),
    };

    public readonly returnManagement = {
        getReturn: (params: any) => returnManagement.getReturn(this.client, params),
        searchReturns: (params: any) => returnManagement.searchReturns(this.client, params),
    };
}
