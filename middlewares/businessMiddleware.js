/**
* This middleware validates that the user has a type 'Business'
* @khattab
*/
module.exports = function(req, res, next)
{
   if(req.user.isBusiness())
   {
      next();
   }
   else
   {
      res.status(403).json
      ({
          status:'failed',
          message: 'Access denied'
      });
   }
};
