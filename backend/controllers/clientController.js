var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var userController = require('./userController');
var strings = require('./helpers/strings');
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');
var nodemailer = require('nodemailer');
var email = require('../config/email');
var crypto = require('crypto');

/**
 * Update Client's info 
 * @param: dateOfBirth : Date
 * @param: name : String
 * @param: email : String
 * @return: json {error} or {message, user}
 * @IOElgohary
 */
module.exports.update = [
    function(req, res, next) {

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
    function(req, res, next) {
        var user = req.body.newUser;
        var dateOfBirth = req.body.dateOfBirth;

        //Validarion
        req.checkBody('dateOfBirth', 'Date of birth is required').notEmpty();
        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        }

        Client.create({
            userId: user._id,
            dateOfBirth: req.body.dateOfBirth
        }, function(err, client) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot register new client"
                    }]
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
    function(req, res, next) {
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

    function(req, res, next) {
        Client.findOne({
            userId: req.user._id
        }, function(err, client) {
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
 */
module.exports.makeReservation = [

    // Passing the activity in the body
    function(req, res, next) {
        var activityId = req.body.activityId;
        Activity.findById(activityId, function(err, Activity) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot find activity"
                    }]
                });
            }
            if (!Activity) {
                return res.json({
                    msg: "activity not found"
                });
            }
            req.body.activity = Activity;
            next();
        });
    },

    // Checking if the age of the client is suitable for this activity age<minage
    function(req, res, next) {
        var curr = new Date();
        var age = Math.floor((curr - req.body.client.dateOfBirth) / 31557600000); //Dividing by 1000*60*60*24*365.25
        if (age < req.body.activity.minAge) {
            return res.json({
                msg: 'You are too young to reserve this activity'
            });
        }
        next();
    },

    // Check if number of participants is within the range
    function(req, res, next) {
        if (req.body.countParticipants <= req.body.activity.minParticipants) {
            return res.json({
                msg: 'Participants are less than the minimum required for this activity'
            });
        }
        if (req.body.countParticipants >= req.body.activity.maxParticipants) {
            return res.json({
                msg: 'Participants are more than the maximum capacity for this activity'
            });
        }
        next();
    },

    // Checking for a duplicate entry and validation
    function(req, res, next) {

        var details = req.body.details;
        var countParticipants = req.body.countParticipants;
        var time = req.body.time;

        req.checkBody('countParticipants', 'Number of participants is required').notEmpty();
        req.checkBody('time', 'Time is required').notEmpty();
        req.checkBody('details', 'Details are required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        }

        var total = countParticipants * req.body.activity.price;
        var query = {
            totalPrice: total,
            details: details,
            countParticipants: countParticipants,
            confirmed: strings.RESERVATION_STATUS_PENDING,
            time: time,
            expirationInHours: req.body.activity.expirationInHours,
            clientId: req.body.client._id,
            activityId: req.body.activityId
        }
        req.body.newReservation = new Reservation(query);

        Reservation.find(query, function(err, Reservations) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }
            if (Reservations.length > 0) {
                return res.json({
                    msg: 'You have already made this reservation'
                });
            }
            next();
        });
    },
    function(req, res) {
        Reservation.create(req.body.newReservation, function(err) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }
            return res.json({
                msg: 'Reservation has been made successfully'
            });
        })
    }
];


/**
 * Gets all reservations of a client
 * @param clientId
 * @return array of reservations
 * @mira
 */
module.exports.viewReservations = [

    function(req, res, next) {
        var clientId = req.body.client._id;
        Reservation.find({
            clientId: clientId
        }, function(err, results) {
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
                data: { reservations: results }
            });
        });
    }

];


/**
 * Removes a certain reservation
 * @param reservationId
 * @mira
 */
module.exports.cancelReservation = [

    function(req, res, next) {
        var reservationId = req.body.reservationId;
        var clientId = req.body.client._id;
        Reservation.update({
            _id: reservationId,
            clientId: clientId
        }, {
            confirmed: strings.RESERVATION_STATUS_CANCELLED
        }, function(err, results) {
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
    function(req, res, next) {
        Activity.findById(req.params.activityId, function(err, activity) {
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
                data: { activity: activity }
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
        function(err, buf) {

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

    client.save(function(err) {

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
            user: email.email,
            pass: email.password
        }

    });
    var mailOptions = {
        to: req.body.newUser.email,
        from: 'verifyemail@noreply.com',
        subject: 'Verify Email',
        text: 'Please click on the following link, or paste this into your browser to verify your account:\n\n' +
            'http://' + req.headers.host + '/client/verify/' + req.body.token
    };

    smtpTransport.sendMail(mailOptions, function(err) {


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
            data: { client: req.body.client }
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

    }, function(err, client) {

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

        client.save(function(err) {

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
            user: email.email,
            pass: email.password
        }

    });

    var mailOptions = {
        to: req.body.user.email,
        from: 'verifyemail@noreply.com',
        subject: 'Your email has been verified.',
        text: 'Hello,\n\n' +
            'This is a confirmation that the email for your account ' + req.body.user.email + ' has just been verified.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
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