/**
* This middleware validates that the user has a type 'Business'
* @khattab
*/
module.exports = function(req, res, next)
{  
    if( !(req.body.business.approved === "True") || !(req.user.isBusiness())){
    res.status(403).json
      ({
          status:'failed',
          message: 'Access denied'
      });
}else
{
    next();
}
};
