var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var passport = require("passport");
var crypto = require("crypto");
var nodemailer = require('nodemailer');
var email = require('../config/email');


/*
    Validates inputs for creating a new user, then either creates the user
    and send a success message or send a failure message.
    @params email, username, password, confirmPassword, userType
    @return json {errors: [error]} or {message: string, user: {userObject}}
    @ameniawy
*/
module.exports.register = [
    function(req, res, next) {
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var confirmPassword = req.body.confirmPassword;

        // Validation
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);
        req.checkBody('userType', 'required').notEmpty();
        req.checkBody('userType', 'not valid').isIn(['Admin', 'BusinessOperator', 'Business', 'Client']);
        req.body.username = req.body.username.toLowerCase();

        var errors = req.validationErrors();

        if (errors) {
            res.json({ errors: errors });
        } else {
            next();
        }
    },
    function(req, res, next) {
        User.create(req.body, function(err, user) {
            if (err) {
                if (err.name === 'MongoError') {
                    res.json({ message: 'Duplicate Username' });
                }
            }
            req.body.newUser = user;
            next();
        });
    }
];


/*
    Validates inputs for logging in a user.
    @param user credentials passed in the request : username, password
    @return json {message: string, user: {userObject}}
    @ameniawy
*/
module.exports.login = [
    function(req, res, next) {
        res.json({message:"User Authenticated", user:req.user});
    }
];


/*
    Logs out user caches in session
    @return json {message: string}
    @ameniawy
*/
module.exports.logout = [
    function(req, res) {
        req.logout();
        res.json({ message: "User logged out successfully" });
    }
];


/**
 * Updates user information
 * @param: name : String
 * @param:email : String
 * @return: json {error} or {message, user}
 * @IOElgohary
 */
module.exports.update = [
    function(req, res) {
        // Validation
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('name', 'name is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }

        req.user.email = req.body.email;
        req.user.name = req.body.name;
         if (req.file != undefined) {
            req.user.profileImage = req.file.filename;

        req.user.save((err) => {
            if (err) {
                return res.json({
                    error: "Error"
                });
            }

            res.json({
                message: "Successfully updated!",
                user: req.user
            });
        })

    }
}
];


/**
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
    function(req, res) {

        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        }, function(err, user) {

            if (err)
                return res.json({ error: err.message });

            if (!user) {
                return res.json({ error: 'Password reset token is invalid or has expired.' });
            }

            res.json({
                message: 'Update Password.',
                user: req.user
            });

        });
    }
];


module.exports.postResetPassword = [
    deleteTokenFromUser,
    sendPasswordResetSuccessMail
]


/**
 * generates token for password reset
 * and adds it to the request body
 * @IOElgohary
 */
function generateToken(req, res, next) {

    crypto.randomBytes(20,
        function(err, buf) {

            if (err)
                return res.json({ error: err.message });
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

    User.findOne({ email: req.body.email },
        function(err, user) {

            if (err)
                return res.json({ error: err.message });

            if (!user) {
                return res.json({ error: "No User registered with this email!" });
            }

            user.resetPasswordToken = req.body.token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {

                if (err)
                    return res.json({ error: err.message });
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
        from: 'passwordreset@demo.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/user/reset/' + req.body.token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    smtpTransport.sendMail(mailOptions, function(err) {

        if (err)
            return res.json({ error: err.message });
        res.json({ message: 'An email has ben sent to reset your password' })

    });
}


/**
 * Verifies the token sent by the user and
 * deletes the token from the user in the DB
 * @param {String} req.params.token
 * @IOElgohary
 */
function deleteTokenFromUser(req, res, next) {

    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }, function(err, user) {

        if (err)
            return res.json({ error: err.message });

        if (!user) {
            return res.json({ error: 'Password reset token is invalid or has expired.' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {

            if (err)
                return res.json({ error: err.message });

            req.logIn(user, function(err) {

                if (err)
                    return res.json({ error: err.message });
                req.body.user = user;
                next();

            });

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
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + req.body.user.email + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
        if (err)
            return res.json({ error: err.message });
        res.json({
            messaeg: "Password changed Successfully."
        })
    });

}
