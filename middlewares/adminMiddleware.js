/**
* This middleware validates that the user has a type 'Admin'
* @khattab
*/
module.exports = function(req, res, next)
{
   if(req.user.isAdmin())
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
