import { getReturn } from './getReturn.js';
import { searchReturns } from './searchReturns.js';
import {
  issueReturnRefund,
  markReturnReceived,
  markReturnReplacementShipped,
  sendReturnMessage,
  closeReturn,
} from './actions.js';

export const returnManagement = {
  getReturn,
  searchReturns,
  issueReturnRefund,
  markReturnReceived,
  markReturnReplacementShipped,
  sendReturnMessage,
  closeReturn,
};
