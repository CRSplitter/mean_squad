var mongoose = require('mongoose');
var	User = mongoose.model('User');
var	bcrypt = require('bcrypt');
var Activity = require('../models/activity');


/*
	Validates inputs for creating a new user, then either creates the user
	and send a success message or send a failure message.
	@params email, username, password, confirmPassword, userType
	@return json {errors: [error]} or {message: string, user: {userObject}}
	@ameniawy
*/
module.exports.register = [
	function(req,res,next) {
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

		if(errors){
			console.log(errors);
			res.json({errors:errors});
		} else {
			next();
		}
	},
	function(req,res,next) {
		User.create(req.body, function(err, user) {
					if(err){
						if(err.name === 'MongoError') {
							return res.json({message: 'Duplicate Username'});
						}
					}
					return res.json({
						message : 'User registered successfully',
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
		res.json({message:"User logged out successfully"});
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
        Activity.findOne({ name: req.params.activityName }, function(err, activity) {
            if (err) {
                console.log("error");
                return next(err);
            }
            if (!activity) {
                return res.json({
                    activity: "not found"
                });
            }
            res.json({
                activity: activity
            });
        });
    }
];
