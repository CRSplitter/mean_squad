/**
 * @module Admin Controller
 * @description The controller that is responsible of handling admin's requests
 */

var mongoose = require('mongoose');
var	User = mongoose.model('User');

/**
 * This function gets is responsible of editing the user type.
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
  req.checkBody('userType', 'not valid').isIn(["Admin", "Client"]);

  var errors = req.validationErrors();
  if (errors)
  {
     res.status(400).json
        ({
           status: 'failed',
           errors: errors
        });

     next();
     return;
  }

  // find the requested user
  User.findById(req.body.userId).then(function(user)
  {
    if(!user)
    {
      res.status(404).json
      ({
        status:'failed',
        message: 'User not found.'
      });
      next();
    }
    else
    {
      // found the user, update it
      user.update({ userType: req.body.userType }).then(function()
      {
        res.status(200).json
        ({
          status: 'succeeded',
          message: 'User type was successfully updated'
        });

        next();
      }).catch(function(err)
      {
        // failed to update the user in the database
        res.status(500).json
        ({
          status:'failed',
          message: 'Internal server error'
        });

        next();
      });
    }
  }).catch(function(err)
  {
    // failed to get the user from the database
    res.status(500).json
    ({
      status:'failed',
      message: 'Internal server error'
    });

    next();
  });
};
