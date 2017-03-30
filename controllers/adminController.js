/**
 * @module Admin Controller
 * @description The controller that is responsible of handling admin's requests
 */

var mongoose = require('mongoose');
var	User = mongoose.model('User');

/**
 * This function gets a user id and a new user type to promote that user.
 * @param  {HTTP}   req  The request object
 * @param  {HTTP}   res  The response object
 * @param  {Function} next Callback function that is called once done with handling the request
 */
module.exports.promote = function(req, res, next)
{
  // Validatation
  req.checkBody('id', 'required').notEmpty();
  req.checkBody('userType', 'required').notEmpty();
  req.checkBody('userType', 'not valid').isString();
  req.checkBody('userType', 'not valid').isIn(["Admin", "Operator"]);

  var errors = req.validationErrors();
  if (errors)
  {
     res.status(400)
        .json(
        {
           status: 'failed',
           errors: errors
        });

     next();
     return;
  }

  // Authorization
  if(req.user.userType != "Admin"
    && req.user.userType != "Business"
    && (req.user.userType === "Business" && req.body.userType === "Admin")
  {
    res.status(403).json
    ({
      status:'failed',
      message: 'Unauthorized.'
    });
    next();
    return;
  }

  User.findById(id).then(function(user)
  {
    // if a business trying to add an admin
    // TODO check if using businessId in the correct way
    if(req.user.userType === "Business"
      && req.user.businessId != user.businessId)
    {
      res.status(403).json
      ({
        status:'failed',
        message: 'Unauthorized.'
      });
      next();
      return;
    }

    user.update({ userType: req.body.userType }).then(function()
    {
      res.status(200).json
      ({
         status: 'succeeded',
         message: 'User type was successfully updated'
      });
    }).catch(function(err)
        {
          // failed to update the user in the database
          res.status(500).json
          ({
             status:'failed',
             message: 'Internal server error'
          });

          next();
          return;
        });

  }).catch(function(err)
      {
        // failed to get the user from the database
        res.status(500).json
        ({
           status:'failed',
           message: 'Internal server error'
        });

        next();
        return;
      });
};
