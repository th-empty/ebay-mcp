import * as getInquiry from './getInquiry.js';
import * as searchInquiries from './searchInquiries.js';
import * as actions from './actions.js';

const inquiryManagement = {
    ...getInquiry,
    ...searchInquiries,
    ...actions,
};

export { inquiryManagement };
