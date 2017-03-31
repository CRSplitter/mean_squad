/**
 * @module Admin Controller
 * @description The controller that is responsible of handling admin's requests
 */

var mongoose = require('mongoose');
var	User = mongoose.model('User');
var	Business = mongoose.model('Business');

/**
 * A function responsible for promoting a user to become an admin.
 * @param  {HTTP}   req  The request object
 * @param  {HTTP}   res  The response object
 * @param  {Function} next Callback function that is called once done with handling the request
 * @ignore
 */
module.exports.promote = function(req, res, next)
{
  // Validatation
  req.checkBody('id', 'required').notEmpty();
  req.checkBody('userType', 'required').notEmpty();
  req.checkBody('userType', 'not valid').isString();
  req.checkBody('userType', 'not valid').isIn(["Admin"]);

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


/**
 * This function is responsible of approving a business request to be added to system.
 * @param  {HTTP}   req  The request object
 * @param  {HTTP}   res  The response object
 * @param  {Function} next Callback function that is called once done with handling the request
 * @ignore
 */
module.exports.accept = function(req, res, next)
{
  req.checkParams('id', 'required').notEmpty();

  Business.update({ id: id }, { approved: 'True' }).then(function()
  {
    res.status(200).json
    ({
      status: 'succeeded',
      message: 'Business was successfully approved'
    });

    next();
  }).catch(function(err)
  {
    res.status(500).json
    ({
      status:'failed',
      message: 'Internal server error'
    });

    next();
  });
};


/**
 * This function is responsible of approving a business request to be added to system.
 * @param  {HTTP}   req  The request object
 * @param  {HTTP}   res  The response object
 * @param  {Function} next Callback function that is called once done with handling the request
 * @ignore
 */
module.exports.reject = function(req, res, next)
{
  req.checkParams('id', 'required').notEmpty();

  Business.destroy({ id: id }).then(function()
  {
    res.status(200).json
    ({
      status: 'succeeded',
      message: 'Business was successfully rejected and deleted'
    });

    next();
  }).catch(function(err)
  {
    res.status(500).json
    ({
      status:'failed',
      message: 'Internal server error'
    });

    next();
  });
};
