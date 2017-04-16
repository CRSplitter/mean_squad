/**
* This middleware validates that the client is verified
* @IOELgohary
*/
module.exports = function(req, res, next)
{
   if(req.body.client.verified === 'verified')
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
