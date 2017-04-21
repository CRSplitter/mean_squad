/**
 * This middleware validates that the user has a type 'BusinessOperator'
 * @ameniawy
 */
var strings = require('../controllers/helpers/strings');
module.exports = function (req, res, next) {
    if (req.user.isBusinessOperator() || ((req.user.isBusiness()) && (req.body.business.approved === strings.BUSINESS_STATUS_APPROVED))) {
        next();
    } else {
        res.status(403).json({
            status: 'failed',
            message: 'Access denied'
        });
    }
};