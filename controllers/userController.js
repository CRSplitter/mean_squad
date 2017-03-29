var mongoose = require('mongoose');
var	User = mongoose.model('user');
var	bcrypt = require('bcrypt');
var passport = require("passport");



/*
	Validates inputs for creating a new user, then either creates the user
	and send a success message or send a failure message.
	@return json {errors: [error]} or {message: string}
	@ameniawy
*/
module.exports.register = [
	function(req,res,next) {
		var name = req.body.name;
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var confirmPassword = req.body.confirmPassword;

		// Validation
		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

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
							console.log('duplicate username');
							return res.json({message: 'Duplicate Username'});
						}
					}
					res.redirect('/user/login');
					return res.json({message : 'User registered successfully'});
				});	
	}

];


/*
	Validates inputs for logging in a user.
	@param user credentials passed in the request : username, password
	@return json {message: string}
	@ameniawy
*/
module.exports.login = [
	function(req, res, next) {
		passport.authenticate("login", {failureRedirect: "/user/login", failureFlash: true},
		function(){
			res.json({message:"User authenticated"});
		});
	}
];


/*
	Logs out user caches in session
	@param user credentials passed in the request : username, password
	@return json {message: string}
	@ameniawy
*/
module.exports.logout = [
	function(req, res) {
		req.logout();
		res.json({message:"User logged out successfully"});
	}
];