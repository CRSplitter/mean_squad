const Strings = {

    // ERROR Types
    INVALID_INPUT: 'Invalid input',
    ACCESS_DENIED: 'Unauthorized',
    DATABASE_ERROR: 'Database Error',
    DUPLICATE_ERROR: 'Duplicate username or email',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NO_RESULTS: 'No results found for given query',
    NOT_FOUND: 'Not found',

    // USER TYPES
    BUSINESS: 'Business',
    BUSINESS_OPERATOR: 'Business Operator',
    SITE_ADMIN: 'Site Admin',
    CLIENT: 'Client',
    ALLOWED_USERS: ['Business', 'Business Operator', 'Site Admin', 'Client'],

    // BUSINESS ACCOUNT STATUS
    BUSINESS_STATUS_APPROVED: 'Approved',
    BUSINESS_STATUS_PENDING: 'Pending',
    BUSINESS_STATUS_REJECTED: 'Rejected',

    // RESERVATION STATUS
    RESERVATION_STATUS_CONFIRMED: 'Confirmed',
    RESERVATION_STATUS_CANCELLED: 'Cancelled',
    RESERVATION_STATUS_PENDING: 'Pending',
    RESERVATION_STATUS_EXPIRES: 'Expired',

    // Client Verified
    CLIENT_VERIFIED: 'verified',
    CLIENT_UNVERIFIED: 'unverified',

    // Payment error
    PAYMENT_ERROR: 'Payment Error'

}

module.exports = Strings;
