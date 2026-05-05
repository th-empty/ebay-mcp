
import { getCase } from './getCase.js';
import { searchCases } from './searchCases.js';
import { provideCaseShipmentInfo, issueCaseRefund, appealCase } from './actions.js';

export const caseManagement = {
    getCase,
    searchCases,
    provideCaseShipmentInfo,
    issueCaseRefund,
    appealCase,
}
