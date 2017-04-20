var strings = require('../controllers/helpers/strings');
/**
* This middleware validates that the client is verified
* @IOELgohary
*/
module.exports = function(req, res, next)
{
   if(req.user.verified === strings.CLIENT_VERIFIED)
   {
      next();
   }
   else
   {
      res.status(403).json
      ({
          status:'failed',
          message: 'Client not verified yet.'
      });
   }
};
