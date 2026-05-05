

import { EbayApiClient } from '../client.js';
import { caseManagement } from './case/index.js';
import { inquiryManagement } from './inquiry/index.js';
import { returnManagement } from './return/index.js';

export class PostOrderApi {
    constructor(private client: EbayApiClient) {}

    public readonly caseManagement = {
        getCase: (params: any) => caseManagement.getCase(this.client, params),
        searchCases: (params: any) => caseManagement.searchCases(this.client, params),
        provideCaseShipmentInfo: (params: any) => caseManagement.provideCaseShipmentInfo(this.client, params),
        issueCaseRefund: (params: any) => caseManagement.issueCaseRefund(this.client, params),
        appealCase: (params: any) => caseManagement.appealCase(this.client, params),
    };

    public readonly inquiryManagement = {
        getInquiry: (params: any) => inquiryManagement.getInquiry(this.client, params),
        searchInquiries: (params: any) => inquiryManagement.searchInquiries(this.client, params),
        sendInquiryMessage: (params: any) => inquiryManagement.sendInquiryMessage(this.client, params),
        provideInquiryShipmentInfo: (params: any) => inquiryManagement.provideInquiryShipmentInfo(this.client, params),
        issueInquiryRefund: (params: any) => inquiryManagement.issueInquiryRefund(this.client, params),
        escalateInquiry: (params: any) => inquiryManagement.escalateInquiry(this.client, params),
    };

    public readonly returnManagement = {
        getReturn: (params: any) => returnManagement.getReturn(this.client, params),
        searchReturns: (params: any) => returnManagement.searchReturns(this.client, params),
        issueReturnRefund: (params: any) => returnManagement.issueReturnRefund(this.client, params),
        markReturnReceived: (params: any) => returnManagement.markReturnReceived(this.client, params),
        markReturnReplacementShipped: (params: any) => returnManagement.markReturnReplacementShipped(this.client, params),
        sendReturnMessage: (params: any) => returnManagement.sendReturnMessage(this.client, params),
        closeReturn: (params: any) => returnManagement.closeReturn(this.client, params),
    };
}
