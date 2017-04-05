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
 * 6.2: As a site admin, I can create another site admin account to help me manage the site.
 * A function responsible for registering a new admin.
 * @params email,username, password, confirmPassword
 * @khattab
 */
module.exports.addType = function(req, res, next)
{
  req.body.userType = 'Admin';
  next();
};

module.exports.create = function(req, res, next)
{
  res.status(200).json
  ({
    status: 'succeeded',
    message: 'Admin was successfully created'
  });

  next();
};


/*
 * 6.4: As a site admin, I can approve business requests to make them able to
 * have an account and add activities.
 * This function is responsible of approving a business request to be added to system.
 * @params id
 * @khattab
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
 * 6.5: As a site admin, I can reject a business’ request to be added to the
 * website so they cannot add their activities in the directory.
 * This function is responsible of rejecting a business request to be added to system.
 * @params id
 * @khattab
 */
module.exports.reject = function(req, res, next)
{
  BusinessController.delete(req, res, next);
};


/*
  Views businesses not approved yet,
  sends error or array of businesses.
  @params none
  @return json {error: error, message: String} or [{businessObj}]
  @mohab
*/
module.exports.viewBusinessRequests = function(req, res, next) {
    Business.find({approved: "Pending"}, function(err, businessRes) {
      if(err) {
        res.json({error: err, message: err.message});
      } else {
        res.json(businessRes);
      }
    });

}