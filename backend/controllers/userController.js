var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var passport = require("passport");
var crypto = require("crypto");
var nodemailer = require('nodemailer');
var email = require('../config/email');
var Strings = require('./helpers/strings');
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/setupPassport').jwtOptions;
var InvalidToken = require('../models/invalidToken');

/*  2.1
    Validates inputs for creating a new user, then either creates the user
    and send a success message or send a failure message.
    @params email, username, password, confirmPassword, userType
    @return json {errors: [error], msg: string, data: [userObject]}
    @ameniawy
*/
module.exports.register = [
    function (req, res, next) {


        // Validation
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);
        req.checkBody('userType', 'required').notEmpty();
        req.checkBody('userType', 'not valid').isIn(Strings.ALLOWED_USERS);


        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        } else {

            req.body.username = req.body.username.toLowerCase();
            req.body.email = req.body.email.toLowerCase();


            next();
        }

    },
    function (req, res, next) {
        // finding duplicate username
        User.find({
            username: req.body.username
        }, function (err, users) {
            if (err) {}
            if (users.length != 0) {
                return res.json({
                    errors: [{
                        type: Strings.DUPLICATE_ERROR,
                        msg: 'Duplicate Username!'
                    }]
                });
            }
            next();
        });
    },
    function (req, res, next) {
        // finding duplicate email
        User.find({
            email: req.body.email
        }, function (err, users) {
            if (err) {}
            if (users.length != 0) {
                return res.json({
                    errors: [{
                        type: Strings.DUPLICATE_ERROR,
                        msg: 'Duplicate E-Mail!'
                    }]
                });
            }
            next();
        });
    },
    function (req, res, next) {
        var newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            userType: req.body.userType,
            userId: req.body.userId
        }

        if (!req.file) {
            // TODO: ADD DEFAULT IMAGE FOR USER
            newUser.profileImage = "defaultUser.jpg";
        } else {
            newUser.profileImage = req.file.filename;
        }
        if(req.body.userType == Strings.SITE_ADMIN || req.body.userType == Strings.BUSINESS_OPERATOR){
            newUser.verified = "verified"
        }
        User.create(newUser, function (err, user) {
            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }

            if (!user) {

                return res.json({
                    errors: [{
                        type: Strings.NOT_FOUND,
                        msg: "User not creatd."
                    }]
                })
            }

            req.body.newUser = user;
            next();
        });
    }
];


/*  2.2
    Validates inputs for logging in a user.
    @param user credentials passed in the request : username, password
    @return json {msg: string, data: [userObject]}
    @ameniawy
*/
module.exports.login = [
    function (req, res) {
        if (req.body.username && req.body.password) {
            var username = req.body.username;
            var password = req.body.password;
        }

        User.findOne({
            username: username
        }).select('+password').exec((err, user) => {

            if (err) {
                return res.status(401).json({

                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }

            if (!user) {
                return res.status(401).json({

                    errors: [{
                        type: Strings.ACCESS_DENIED,
                        msg: "no user found  with this username."
                    }]
                });
            }

            user.checkPassword(password, function (err, isMatch) {
                if (err) {
                    return res.json({
                        errors: [{
                            type: Strings.INTERNAL_SERVER_ERROR,
                            msg: 'Problem with Password authentication.'
                        }]
                    })
                }
                if (isMatch) {

                    var payload = {
                        user: user
                    };
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    user.password = undefined;
                    return res.json({
                        msg: "User Authenticated",
                        data: {
                            token: token,
                            user: user
                        }
                    });

                } else {
                    return res.json({
                        errors: [{
                            type: Strings.INVALID_INPUT,
                            msg: 'Wrong password'
                        }]
                    });
                }
            });
        })
    }
];


/*  2.3
    Logs out user caches in session
    @return json {msg: string}
    @ameniawy
*/
module.exports.logout = [
    function (req, res) {

        var token = req.headers['authorization'].split(" ")[1];
        var invalidToken = new InvalidToken({
            token
        });

        invalidToken.save((err) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                })
            }
            return res.json({
                msg: "User logged out successfully."
            });
        })

    }
];


/** 2.4
 * Updates user information
 * @param: name : String
 * @param:email : String
 * @return: {errors: [error], msg: string, data: [userObject]}
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

        req.user.email = req.body.email;
        req.user.name = req.body.name;
        if (req.file != undefined)
            req.user.profileImage = req.file.filename;

        req.user.save((err) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: "Cannot save user."

                    }]
                });
            }

            return res.json({
                message: "Successfully updated!",
                data: {
                    user: req.user
                }
            });
        })

    }
];


/** 2.3
 * Process forget password request as follows:
 * 1. generate random token
 * 2. add token to requesting user
 * 3. send token by mail to the user
 * @IOElgohary
 */
module.exports.forgetPassword = [
    generateToken,
    addTokenToUser,
    sendTokenByMail
];


/**
 * Checks the password reset token sent by the user
 * @param {String} req.params.token
 * @IOElgohary
 */
module.exports.getResetPassword = [
    function (req, res) {

        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, function (err, user) {

            if (err)
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'Error Finding User'
                    }]
                });

            if (!user) {
                return res.json({
                    errors: [{
                        type: Strings.INVALID_INPUT,
                        msg: 'Password reset token is invalid or has expired.'
                    }]
                });
            }

            return res.json({
                msg: 'Update Password.',
                data: {
                    user: user
                }
            });

        });
    }
];

/**
 * updates user's password as follows:
 * 1. verifies token, deletes it from user model
 *    and updates password
 * 2. send confirmation mail after updating password
 */
module.exports.postResetPassword = [
    deleteTokenFromUser,
    sendPasswordResetSuccessMail
]

function getUserById(req, res, next) {
    User.findById({
            _id: req.body.userId
        },
        (err, user) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'Error Finding User.'
                    }]
                })
            }

            if (!user) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'No User with this Id.'
                    }]
                })
            }

            req.body.user = user;
            next();
        })
}
module.exports.getUserById = getUserById;


/**
 * generates token for password reset
 * and adds it to the request body
 * @IOElgohary
 */
function generateToken(req, res, next) {

    req.checkBody('email', 'Email is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.json({
            errors: errors
        });
    }

    crypto.randomBytes(20,
        function (err, buf) {

            if (err)
                return res.json({
                    errors: [{
                        type: Strings.INVALID_INPUT,
                        msg: 'Error generating Token.'
                    }]
                });
            req.body.token = buf.toString('hex');
            next();

        });

}


/**
 * Saves the password reset token to the user
 * @param {String} req.body.token
 * @IOElgohary
 */
function addTokenToUser(req, res, next) {

    User.findOne({
            email: req.body.email
        },
        function (err, user) {

            if (err)
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'Error finding user.'
                    }]
                });

            if (!user) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: "No User registered with this email!"
                    }]
                });
            }

            user.resetPasswordToken = req.body.token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function (err) {

                if (err)
                    return res.json({
                        errors: [{
                            type: Strings.DATABASE_ERROR,
                            msg: 'Error saving user.'
                        }]
                    });
                req.body.user = user;
                next();
            });
        });
}


/**
 * Send the token to the email in the request
 * @param {String} req.body.user.email
 * @param {String} req.body.token
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
        to: req.body.user.email,
        from: 'passwordreset@noreply.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + "localhost:8000" + '/update_password/' + req.body.token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    smtpTransport.sendMail(mailOptions, function (err) {

        if (err)
            return res.json({
                errors: [{
                    type: Strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending password reset mail. Please try again later.'
                }]
            });
        return res.json({
            msg: 'An email has been sent to reset your password'
        })

    });
}


/**
 * Verifies the token sent by the user and
 * deletes the token from the user in the DB
 * @param {String} req.params.token
 * @IOElgohary
 */
function deleteTokenFromUser(req, res, next) {

    req.checkBody('password', 'Password can\'t be empty').notEmpty();
    req.checkBody('confirmPassword', 'Confirm Password is required').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match.').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        return res.json({
            errors: errors
        });
    }

    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function (err, user) {

        if (err)
            return res.json({
                errors: [{
                    type: Strings.DATABASE_ERROR,
                    msg: 'Error finding user.'
                }]
            });

        if (!user) {
            return res.json({
                errors: [{
                    type: Strings.INVALID_INPUT,
                    msg: 'Password reset token is invalid or has expired.'
                }]
            });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function (err) {

            if (err)
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'Error saving user.'
                    }]
                });

            req.body.user = user;
            next();

        });

    });
}


/**
 * Sends confirmation email
 * @param {string} req.body.user.email 
 * @IOElgohary
 */
function sendPasswordResetSuccessMail(req, res) {

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
        from: 'passwordreset@noreply.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + req.body.user.email + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
        if (err)
            return res.json({
                errors: [{
                    type: Strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending confirmation mail.'
                }]
            });
        return res.json({
            msg: "Password changed Successfully."
        })
    });

}

module.exports.getUserByUsername = function (req, res, next) {
    User.find({
            username: req.query.username
        },
        (err, user) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'Error Finding User.'
                    }]
                })
            }

            if (!user) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'No User with this username.'
                    }]
                })
            }

            return res.json({
                msg: 'Activities retirieved successfully',
                data: user
            });
        })
}

module.exports.getUserObject = function (req, res) {
    User.findById({
            _id: req.body.userId
        },
        (err, user) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                })
            }

            if (!user) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'No User with this Id.'
                    }]
                })
            }

            return res.json({
                msg: "Success",
                data: {
                    user: user
                }
            })
        })
}


/**
 * Sends email verification token to client:
 * 1. generate random token
 * 2. add token to user
 * 3. send token by mail to the user
 * @IOElgohary
 */
module.exports.requestEmailVerification = [
    generateToken,
    addTokenToUser,
    sendTokenByMail
];

/**
 * Verify Client email as follows:
 * 1. Verify that the token belongs to a client
 *    and change client to verified
 * 2. send a success email to the Client
 */
module.exports.verifyEmail = [
    verifyTokenFromUser,
    getUserById,
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
                        type: Strings.INVALID_INPUT,
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
function addTokenToUser(req, res, next) {

    var user = req.body.newUser;

    user.verificationToken = req.body.token;

    user.save(function (err) {

        if (err) {
            return res.json({
                errors: [{
                    type: Strings.DATABASE_ERROR,
                    msg: 'Error saving User.'
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
            'http://localhost:8000' + '/verifyemail/' + req.body.token
    };

    smtpTransport.sendMail(mailOptions, function (err) {


        if (err) {
            return res.json({
                errors: [{
                    type: Strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending verification mail. Please try again later.'
                }]
            });
        }
        return res.json({
            msg: 'User Successfully Created. An email has been sent to verify your email.',
            data: {
                user: req.body.newUser
            }
        })

    });
}

/**
 * Verifies the token sent by the user and
 * deletes the token from the User in the DB
 * @param {String} req.params.token
 * @IOElgohary
 */
function verifyTokenFromUser(req, res, next) {

    User.findOne({
        verificationToken: req.params.token,

    }, function (err, user) {

        if (err){
            console.log("ERRR");
            return res.json({
                errors: [{
                    type: Strings.DATABASE_ERROR,
                    msg: 'Error finding User.'
                }]
            });
        }
        if (!user) {
            return res.json({
                errors: [{
                    type: Strings.INVALID_INPUT,
                    msg: 'Verification token is invalid.'
                }]
            });
        }

        user.verificationToken = undefined;
        user.verified = "verified";

        user.save(function (err) {

            if (err) {
                return res.json({
                    errors: [{
                        type: Strings.DATABASE_ERROR,
                        msg: 'Error saving User.'
                    }]
                });
            }
            req.body.userId = user._id;
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
                    type: Strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending confirmation mail.'
                }]
            });
        return res.json({
            msg: "Email verified Successfully.",
            data: {
                user: req.body.user
            }
        })
    });

}