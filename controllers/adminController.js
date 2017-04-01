/**
 * @module Admin Controller
 * @description The controller that is responsible of handling admin's requests
 */


var mongoose = require('mongoose');
var	User = mongoose.model('User');
var	Business = mongoose.model('Business');
var UserController = require('./userController');
var BusinessController = require('./businessController');


/*
 * A function responsible for registering a new admin.
 */
module.exports.register = function(req, res, next)
{
  req.body.userType = 'Admin';
  UserController.register[0](req, res, next);
};


/*
 * This function is responsible of approving a business request to be added to system.
 */
module.exports.accept = function(req, res, next)
{
  req.checkParams('id', 'required').notEmpty();

  Business.findById(req.params.id).then(function(business)
  {
    if(business)
    {
      business.update({ approved: 'True' }).then(function()
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
    }
    else
    {
      res.status(404).json
      ({
        status:'failed',
        message: 'Business was not found'
      });

      next();
    }
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


/*
 * This function is responsible of rejecting a business request to be added to system.
 */
module.exports.reject = function(req, res, next)
{
  BusinessController.delete(req, res, next);
};
