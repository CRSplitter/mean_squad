var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var User = mongoose.model('User');
var userController = require('./userController');
var reservationController = require('./reservationController');
var strings = require('./helpers/strings');
var helperFunctions = require('./helpers/functions');
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');
var Day = mongoose.model('Day');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var User = mongoose.model('User');
var ClientRateActivity = mongoose.model('ClientRateActivity');


/**
 * Show full details of a specific client.
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */ // @khattab
module.exports.show = function (req, res, next) {
    req.checkParams('username', 'required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.json({
            errors: errors
        });
        return;
    }

    User.findOne({
        username: req.params.username
    }).then(function (user) {
        if (user) {
            Client.findOne({
                userId: user._id
            }).then(function (client) {
                if (client) {
                    client.userId = user;
                    res.json({
                        msg: 'Success',
                        data: {
                            client: client
                        }
                    });
                    next();

                } else {
                    res.json({
                        errors: [{
                            type: strings.NOT_FOUND,
                            msg: 'Client not found'
                        }]
                    });
                }
            }).catch(function (err) {
                res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: strings.INTERNAL_SERVER_ERROR
                    }]
                });
            });
        } else {
            res.json({
                errors: [{
                    type: strings.NOT_FOUND,
                    msg: 'User not found'
                }]
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: strings.INTERNAL_SERVER_ERROR
            }]
        });
    });
};


/**
 * Update Client's info
 * @param: dateOfBirth : Date
 * @param: name : String
 * @param: email : String
 * @return: json {error} or {message, user}
 * @IOElgohary
 */
module.exports.update = [
    function (req, res, next) {

        // Validation
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('name', 'name is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        }

        var query = {
            // find query
            userId: req.user._id
        };

        var newData = {
            // Update
            dateOfBirth: req.body.dateOfBirth
        }

        Client.update(query, newData, (err, updated) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error updating info'
                    }]
                });
            }
            next();
        });
    },
    userController.update
]


/**
 * register new client
 * @param: dateOfBirth : Date
 * @return: json {error} or {message, user}
 * @ameniawy
 */
module.exports.register = [
    function (req, res, next) {
        var user = req.body.newUser;
        var dateOfBirth = req.body.dateOfBirth;

        //Validarion
        req.checkBody('dateOfBirth', 'Date of birth is required').notEmpty();
        var errors = req.validationErrors();

        if (errors) {
            User.findOneAndRemove({
                _id: user._id
            }, (err, removed) => {
                if (err) {
                    res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    })
                }

                return res.json({
                    errors: errors
                });
            });

        }

        Client.create({
            userId: user._id,
            dateOfBirth: req.body.dateOfBirth
        }, function (err, client) {
            if (err) {

                User.findOneAndRemove({
                    _id: user._id
                }, (err, removed) => {
                    if (err) {
                        res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: err.message
                            }]
                        })
                    }

                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: "Cannot register new client"
                        }]
                    });
                });

            }

            req.body.client = client;
            next();

        });
    }
];


/**
 * adds userType to req header
 * @ameniawy
 */
module.exports.addUserType = [
    function (req, res, next) {
        req.body.userType = 'Client';
        next();
    }
];


/**
 * Gets the client from the userId
 * @param clientId
 * @return json
 * @mira
 */


module.exports.getClient = [
    function (req, res, next) {
        Client.findOne({
            userId: req.user._id
        }, function (err, client) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot get client"
                    }]
                });
            }
            req.body.client = client;
            next();
        })
    }
];



/**
 * Creates a new Reservation instance and returns success/failure message
 * @param details, countParticipants, time, expirationInHours, clientId, activityId
 * @return json
 * @mira
 * @ameniawy
 */
module.exports.makeReservation = [
    // Passing the activity in the body
    reservationController.findActivity,
    // Checking if the age of the client is suitable for this activity age<minage
    reservationController.checkAge,
    // Check if number of participants is within the range
    reservationController.checkMinMax,
    // Check if number of requested participants remaining for requested timing
    reservationController.checkAvailable,
    // get date
    reservationController.setReservationDate,
    // Checking for a duplicate entry and validation
    reservationController.duplicateReservation,
    // update the number of currentParticipants
    reservationController.updateSlot,
    // create the reservation
    reservationController.createReservation
];


/**
 * Gets all reservations of a client
 * @param clientId
 * @return array of reservations
 * @mira
 */
module.exports.viewReservations = [

    function (req, res, next) {
        var clientId = req.body.client._id;
        Reservation.find({
            clientId: clientId
        }).populate({path: 'clientId',
        populate: {path: "userId"}})
        .populate({path: 'activityId',
        populate: {path: "businessId", 
        populate: {path: "userId",
        populate: {path: "clientId"}}}}).exec(function (err, results) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot find reservations"
                    }]
                });
            }
            return res.json({
                msg: "Reservations retrieved",
                data: {
                    reservations: results
                }
            });
        });
    }

];


/**
 * Cancels a certain reservation
 * @param reservationId
 * @mira, ameniawy
 */
module.exports.cancelReservation = [
    // gets the reservation attributes
    function (req, res, next) {
        Reservation.findById(req.body.reservationId, function (err, reservation) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot cancel reservation"
                    }]
                });
            }
            req.body.countParticipants = reservation.countParticipants;
            req.body.slotId = reservation.slotId;
            req.body.dayId = reservation.dayId;
            next();
        });
    },
    // decrements the currentParticipants from the slot
    function (req, res, next) {
        Day.update({
                _id: req.body.dayId,
                "slots._id": req.body.slotId
            }, {
                $inc: {
                    "slots.$.currentParticipants": req.body.countParticipants * (-1)
                }
            }, {
                safe: true,
                upsert: true,
                new: true
            },
            function (err, day) {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    });
                }
                next();
            });
    },
    // changes the reservation status to Cancelled
    function (req, res, next) {
        var reservationId = req.body.reservationId;
        var clientId = req.body.client._id;
        Reservation.update({
            _id: reservationId,
            clientId: clientId
        }, {
            confirmed: strings.RESERVATION_STATUS_CANCELLED
        }, function (err, results) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot cancel reservation"
                    }]
                });
            }
            if (results.nModified == 0) {
                return res.json({
                    msg: "Reservation not found"
                });
            } else {
                return res.json({
                    msg: "Reservation has been cancelled successfully"
                });
            }
        });
    }


];


/*
	views activity with all its details requested by the user
	@param activityName passed as request param at the route :activityName
	@return json {activity: not found} if there's no current activity
	@return json {activity: activity} with all its details
	@megz
*/
module.exports.viewActivity = [
    function (req, res, next) {
        Activity.findById(req.params.activityId)
            .populate('activitySlots')
            .exec(function (err, activity) {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: "Cannot find activity"
                        }]
                    });
                }
                if (!activity) {
                    return res.json({
                        msg: "Activity not found"
                    });
                }
                return res.json({
                    msg: "Activity found",
                    data: {
                        activity
                    }
                });
            });
    }
];


/**
 * Sends email verification token to client:
 * 1. generate random token
 * 2. add token to client
 * 3. send token by mail to the client
 * @IOElgohary
 */
module.exports.requestEmailVerification = [
    generateToken,
    addTokenToClient,
    sendTokenByMail
];

/**
 * Verify Client email as follows:
 * 1. Verify that the token belongs to a client
 *    and change client to verified
 * 2. send a success email to the Client
 */
module.exports.verifyEmail = [
    verifyTokenFromClient,
    userController.getUserById,
    sendVerificationSuccessMail
]


/**
 * generates token for email verification
 * and adds it to the request body
 * @IOElgohary
 */
function generateToken(req, res, next) {

    crypto.randomBytes(20,
        function (err, buf) {

            if (err)
                return res.json({
                    errors: [{
                        type: strings.INVALID_INPUT,
                        msg: 'Error generating Token.'
                    }]
                });
            req.body.token = buf.toString('hex');
            next();

        });

}

/**
 * Saves the email verification token to the client
 * @param {String} req.body.token
 * @IOElgohary
 */
function addTokenToClient(req, res, next) {

    var client = req.body.client;

    client.verificationToken = req.body.token;

    client.save(function (err) {

        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error saving Client.'
                }]
            });
        }
        next();
    });

}

/**
 * Send the token to the email in the request
 * @param {String} req.body.user.email
 * @param {String} req.body.token
 * @return {json} {
 * errors: [errors],
 * msg :String,
 * data: [{clientObject}]
 * }
 * @IOElgohary
 */
function sendTokenByMail(req, res) {

    var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }

    });
    var mailOptions = {
        to: req.body.newUser.email,
        from: 'verifyemail@noreply.com',
        subject: 'Verify Email',
        text: 'Please click on the following link, or paste this into your browser to verify your account:\n\n' +
            'http://' + req.headers.host + '/client/verify/' + req.body.token
    };

    smtpTransport.sendMail(mailOptions, function (err) {


        if (err) {
            return res.json({
                errors: [{
                    type: strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending verification mail. Please try again later.'
                }]
            });
        }
        return res.json({
            msg: 'Client Successfully Created. An email has been sent to verify your email.',
            data: {
                client: req.body.client
            }
        })

    });
}

/**
 * Verifies the token sent by the user and
 * deletes the token from the Client in the DB
 * @param {String} req.params.token
 * @IOElgohary
 */
function verifyTokenFromClient(req, res, next) {

    Client.findOne({
        verificationToken: req.params.token,

    }, function (err, client) {

        if (err)
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error finding Client.'
                }]
            });

        if (!client) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: 'Verification token is invalid.'
                }]
            });
        }

        client.verificationToken = undefined;
        client.verified = strings.CLIENT_VERIFIED;

        client.save(function (err) {

            if (err)
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error saving Client.'
                    }]
                });
            req.body.userId = client.userId;
            req.body.client = client;
            next();
        });

    });
}



/**
 * Sends confirmation email
 * @param {string} req.body.user.email
 * @return {json} {
 * errors: [errors],
 * msg :String,
 * data: [{userObject}, {clientObject}]
 * }
 * @IOElgohary
 */
function sendVerificationSuccessMail(req, res) {

    var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }

    });

    var mailOptions = {
        to: req.body.user.email,
        from: 'verifyemail@noreply.com',
        subject: 'Your email has been verified.',
        text: 'Hello,\n\n' +
            'This is a confirmation that the email for your account ' + req.body.user.email + ' has just been verified.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
        if (err)
            return res.json({
                errors: [{
                    type: strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending confirmation mail.'
                }]
            });
        return res.json({
            msg: "Email verified Successfully.",
            data: {
                user: req.body.user,
                client: req.body.client
            }
        })
    });

}

/**
 * Adds Activity Rating in the DataBase
 */

module.exports.rateActivity = [
    // Add Activity
    function (req, res, next) {
        Activity.findById(req.body.activityId)
            .exec((err, activity) => {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    });
                }

                if (!activity) {
                    return res.json({
                        errors: [{
                            type: strings.INVALID_INPUT,
                            msg: "No Activity with this Id."
                        }]
                    });
                }

                req.body.activity = activity;
                next();
            })


    },
    // Validation
    function (req, res, next) {
        var rating = req.body.rating;

        if (rating > 5 || rating < 1) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Rating must be between 1 and 5 inclusive."
                }]
            })
        }
        next();
    },
    // Add rating
    function (req, res, next) {

        var query = {
            clientId: req.body.client._id,
            activityId: req.body.activityId
        }

        ClientRateActivity.findOne(query)
            .exec((err, ratingObject) => {
                if (err) {
                    return res.json({
                        erros: [{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    })
                }

                if (ratingObject) {
                    // If rating already exists modify it
                    ratingObject.rating = req.body.rating;
                } else {
                    // IF rating doesn't exist create a new rating
                    ratingObject = new ClientRateActivity({
                        clientId: req.body.client._id,
                        activityId: req.body.activityId,
                        rating: req.body.rating
                    })
                }

                ratingObject.save((err, rating) => {
                    if (err) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: err.message
                            }]
                        });
                    }

                    if (!rating) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: 'Error Saving Rating.'
                            }]
                        });
                    }
                    next();
                })
            })
    },
    // Update Activity's Average Rating
    function (req, res) {

        var activityId = req.body.activityId;
        var ratingSum = 0;
        var activity = req.body.activity;

        ClientRateActivity.find({
            activityId: activityId
        }).exec((err, ratings) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }

            if (ratings.length >= 0) {

                for (var i = 0; i < ratings.length; i++) {
                    ratingSum += ratings[i].rating;
                }

                activity.avgRating = ratingSum / ratings.length;
                activity.save((err, activity) => {
                    if (err) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: err.message
                            }]
                        });
                    }

                    if (!activity) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: "There was a problem Saving the Activity."
                            }]
                        });
                    }

                    return res.json({
                        msg: "Successfully Updated Rating.",
                        data: {
                            activity: activity
                        }
                    })
                })

            } else {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "There was a problem calculating the Rating."
                    }]
                });
            }
        })
    }
]
