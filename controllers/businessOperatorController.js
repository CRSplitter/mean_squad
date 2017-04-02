/**
 * @module Business Operator Controller
 * @description The controller that is responsible of handling admin's requests
 */


var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');
var	User = mongoose.model('User');
var	Business = mongoose.model('Business');
var BusinessOperator = mongoose.model('BusinessOperator');
var UserController = require('./userController');


/*
 * 5.9: As a business, I can add operator to my business (to make reservation on behalf of clients).
 * A function responsible for register a new business operator.
 * @params email,username, password, confirmPassword
 * @khattab
 */
module.exports.addType = function(req, res, next)
{
  req.body.userType = 'BusinessOperator';
  next();
}


/*
 * A function responsible for creating a new business operator
 * this gets called from the User.register
 * @params user
 * @khattab
 */
module.exports.create = function(req, res, next)
{
  Business.findOne({ userId: req.user._id }).then(function(business)
  {
    BusinessOperator.create({ userId: req.body.newUser._id, businessId: business.businessId }).then(function()
      {
        res.status(200).json
        ({
          status: 'succeeded',
          message: 'Business operator was successfully created'
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
