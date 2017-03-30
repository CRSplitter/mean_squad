var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var passport = require("passport");


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
        req.body.username = req.body.username.toLowerCase();

        var errors = req.validationErrors();

        if (errors) {
            console.log(errors);
            res.json({ errors: errors });
        } else {
            next();
        }
    },
    function(req, res, next) {
        User.create(req.body, function(err, user) {
            if (err) {
                if (err.name === 'MongoError') {
                    return res.json({ message: 'Duplicate Username' });
                }
            }
            return res.json({
                message: 'User registered successfully',
                user: user
            });
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
        res.json({ message: "User Authenticated", user: req.user });
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
        req.user.profileImage = req.body.profileImage;

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
];