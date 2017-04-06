/**
 * @module Admin Controller
 * @description The controller that is responsible of handling admin's requests
 */

var mongoose = require('mongoose');
var	User = mongoose.model('User');
var	Business = mongoose.model('Business');
var UserController = require('./userController');
var BusinessController = require('./businessController');
var strings = require('./helpers/strings');


/*
 * 6.2: As a site admin, I can create another site admin account to help me manage the site.
 * A function responsible for registering a new admin.
 * @params email,username, password, confirmPassword
 * @khattab
 */
module.exports.addType = function(req, res, next) {
    req.body.userType = strings.SITE_ADMIN;
    next();
};


module.exports.create = function(req, res, next) {
    // Success
    res.json({
        msg: 'Admin created successfully'
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
module.exports.accept = function(req, res, next) {
    req.checkParams('id', 'required').notEmpty();

    Business.findById(req.params.id).then(function(business) {
        if(business) {
          business.update({ approved: strings.BUSINESS_STATUS_APPROVED }).then(function() {
              res.json({
                  msg: 'Business was successfully approved'
              });
              next();
          }).catch(function(err) {
              return res.json({
                      errors: [{
                          type: DATABASE_ERROR,
                          msg: 'Internal server error'
                      }]
                  });
              next();
          });
        } else {
              return res.json({
                      errors: [{
                          type: DATABASE_ERROR,
                          msg: 'Business not found'
                      }]
                  });
              next();
      }
    }).catch(function(err) {
              return res.json({
                      errors: [{
                          type: DATABASE_ERROR,
                          msg: 'Internal server error'
                      }]
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
module.exports.reject = function(req, res, next) {
    Business.findByIdAndUpdate(req.params.id, {
        $set:{
          approved: strings.BUSINESS_STATUS_REJECTED
        }

    }, function(err, updateRes) {
        if(err) {
            return res.json({
                    errors: [{
                        type: DATABASE_ERROR,
                        msg: 'Error rejecting a business'
                    }]
                }); 
        }
        res.json({
            msg: 'Admin created successfully'
        });
    });
};


/*
  6.3
  Views businesses not approved yet,
  sends error or array of businesses.
  @params none
  @return json {error: error, message: String} or [{businessObj}]
  @mohab
*/
module.exports.viewBusinessRequests = function(req, res, next) {
    Business.find({approved: strings.BUSINESS_STATUS_PENDING}, function(err, businessRes) {
        if(err) {
              return res.json({
                      errors: [{
                          type: DATABASE_ERROR,
                          msg: 'Error approving a business'
                      }]
                  });
        } else {
              res.json({
                  msg: 'Businesses retirieved successfully',
                  data: [{
                      businesses:businessRes
                  }]
              });
          }
    });

}