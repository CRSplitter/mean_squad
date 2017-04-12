const Strings = {

    // ERROR Types
    INVALID_INPUT: 'Invalid input',
    ACCESS_DENIED: 'Unauthorized',
    DATABASE_ERROR: 'Database Error',
    DUPLICATE_ERROR: 'Duplicate username or email',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NO_RESULTS: 'No results found for given query',
    MAX_PARTICIPANTS: 'Maximum number of participants for this slot exceeded',

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

    // Week days
    WEEK_DAY: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

}

module.exports = Strings;