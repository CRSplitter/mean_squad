/**
 * @module Business Operator Controller
 * @description The controller that is responsible of handling admin's requests
 */


var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');
var User = mongoose.model('User');
var BusinessOperator = mongoose.model('BusinessOperator');
var UserController = require('./userController');


/*
 * A function responsible for register a new business operator.
 */
module.exports.register = function(req, res, next)
{
  req.body.userType = 'BusinessOperator';
  UserController.register(req, res, next);
}


/*
 * A function responsible for creating a new business operator
 * this gets called from the User.register
 */
module.exports.create = function(req, res, next)
{
  var user = req.body.newUser;
  BusinessOperator.create({ userId: user._id, businessId: req.user._id}).then(function()
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
};
