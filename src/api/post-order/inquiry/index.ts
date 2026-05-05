import * as getInquiry from './getInquiry.js';
import * as searchInquiries from './searchInquiries.js';

const inquiryManagement = {
    ...getInquiry,
    ...searchInquiries,
};

export { inquiryManagement };
