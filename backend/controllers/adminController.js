/**
 * @module Admin Controller
 * @description The controller that is responsible of handling admin's requests
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Business = mongoose.model('Business');
var UserController = require('./userController');
var BusinessController = require('./businessController');
var strings = require('./helpers/strings');
var nodemailer = require('nodemailer');
var email = require('../config/email');
var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: email.email,
        pass: email.password
    }

});

/*
 * 6.2: As a site admin, I can create another site admin account to help me manage the site.
 * @khattab
 */
module.exports.addType = function (req, res, next) {
    req.body.userType = strings.SITE_ADMIN;
    next();
};


module.exports.create = function (req, res, next) {
    // Success
    res.json({
        msg: 'Admin created successfully'
    });
    next();
};


/*
 * 6.4: As a site admin, I can approve business requests to make them able to
 * have an account and add activities.
 * @khattab
 */
module.exports.accept = function (req, res, next) {
    req.checkParams('id', 'required').notEmpty();

    Business.findById(req.params.id).then(function (business) {

        if (business.approved == strings.BUSINESS_STATUS_APPROVED) {

            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Business is already Approved"
                }]
            });
        }

        if (business) {
            business.update({
                approved: strings.BUSINESS_STATUS_APPROVED
            }).then(function () {
                req.businessId = business._id
                req.accepted = true
                next();
            }).catch(function (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
                next();
            });
        } else {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Business not found'
                }]
            });
            next();
        }
    }).catch(function (err) {
        return res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: err.message
            }]
        });
        next();
    });
};


/*
 * 6.5: As a site admin, I can reject a business’ request to be added to the
 * website so they cannot add their activities in the directory.
 * @khattab
 */
module.exports.reject = function (req, res, next) {
    req.checkParams('id', 'required').notEmpty();

    Business.findById(req.params.id).then(function (business) {

        if (business.approved == strings.BUSINESS_STATUS_REJECTED) {

            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Business is already Rejected"
                }]
            });
        }

        if (business) {
            business.update({
                approved: strings.BUSINESS_STATUS_REJECTED
            }).then(function () {
                req.businessId = business._id
                next();
            }).catch(function (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
                next();
            });
        } else {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Business not found'
                }]
            });
            next();
        }
    }).catch(function (err) {
        return res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: err.message
            }]
        });
        next();
    });
};


module.exports.sendResponseToBusiness = function (req, res) {
    console.log(req.accepted);
    Business.findById(req.businessId)
        .populate('userId')
        .exec((err, business) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }

            if (!business) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: "Business not Found."
                    }]
                });
            }

            if (req.accepted) {
                var mailOptions = {
                    to: business.userId.email,
                    from: 'account@noreply.com',
                    subject: 'Your account has been approved',
                    text: 'Your Business has been Approved Successfully.\n\n'
                };

                smtpTransport.sendMail(mailOptions, function (err) {

                    if (err) {
                        return res.json({
                            errors: [{
                                type: Strings.INTERNAL_SERVER_ERROR,
                                msg: 'Error sending Mail to Business.'
                            }]
                        });
                    }

                    return res.json({
                        msg: 'Business Successfully Approved.'
                    })
                });
            } else{

                var mailOptions = {
                    to: business.userId.email,
                    from: 'account@noreply.com',
                    subject: 'Your account has been rejected',
                    text: 'Your Business has been Rejected.\n' +
                        'Please Contact the Site Administration.\n\n'
                };

                smtpTransport.sendMail(mailOptions, function (err) {

                    if (err) {
                        return res.json({
                            errors: [{
                                type: Strings.INTERNAL_SERVER_ERROR,
                                msg: 'Error sending Mail to Business.'
                            }]
                        });
                    }

                    return res.json({
                        msg: 'Business Successfully Rejected'
                    })


                });

            }

        })
}


/*
  6.3
  Views businesses not approved yet,
  sends error or array of businesses.
  @params none
  @return json {error: error, message: String} or [{businessObj}]
  @mohab
*/
module.exports.viewBusinessRequests = function (req, res, next) {
    Business.find({
        approved: strings.BUSINESS_STATUS_PENDING
    }, function (err, businessRes) {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: strings.INTERNAL_SERVER_ERROR
                }]
            });
        } else {
            res.json({
                msg: 'Businesses retirieved successfully',
                data: {
                    businesses: businessRes
                }
            });
        }
    });

}


module.exports.resetBalance = [
    getPreviousBalance,
    resetBalance,
    notifyBusiness

]

function getPreviousBalance(req, res, next) {

    var businessId = req.body.businessId;

    Business.findById(businessId).populate('userId').exec((err, business) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            })
        }

        if (!business) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'No Business found with the provided ID.'
                }]
            })
        }

        req.body.businessEmail = business.userId.email;
        req.body.prevBalance = business.balance;

        req.body.business = business;
        next();

    })
}

function resetBalance(req, res, next) {

    var business = req.body.business;
    business.balance = 0;
    business.save((err) => {

        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            })
        }

        next();
    })

}

function notifyBusiness(req, res) {

    var mailOptions = {
        to: req.body.businessEmail,
        from: 'payment@noreply.com',
        subject: 'Balance Reset',
        text: 'Your Balance has been reset.\n\n' +
            'Previous Balance: ' + req.body.prevBalance + '\n\n' +
            'If you have not received your money, please contact an administrator.\n\n'

    };

    smtpTransport.sendMail(mailOptions, function (err) {

        if (err)
            return res.json({
                errors: [{
                    type: Strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending Invoice mail. Please try again later.'
                }]
            });

        res.json({
            msg: 'Balance Successfully reset. A notification has been sent to the business.'
        })


    });
}