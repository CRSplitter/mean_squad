/**
* This middleware validates that the user is logged in.
* @khattab
*/
module.exports = function(req, res, next)
{
   if(req.isAuthenticated())
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
