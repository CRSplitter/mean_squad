/**
* This middleware validates that the user has a type 'Client'
* @ameniawy
*/
module.exports = function(req, res, next)
{
   if(req.user.isClient())
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
