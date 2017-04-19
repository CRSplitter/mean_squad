/**
* This middleware validates that the user has a type 'Business'
* @khattab
*/
var strings = require('../controllers/helpers/strings');
module.exports = function(req, res, next)
{
    if(!(req.body.business.approved === strings.BUSINESS_STATUS_APPROVED) || !(req.user.isBusiness())) {
        return res.status(403).json({
            status:'failed',
            message: 'Access denied'
        });
    } else {
        next();
    }
};
