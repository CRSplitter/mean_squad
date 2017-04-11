/**
* This middleware validates that the user has a type 'BusinessOperator'
* @ameniawy
*/
module.exports = function(req, res, next)
{
   if(req.user.isBusinessOperator())
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
