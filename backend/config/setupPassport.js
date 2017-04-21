/*
    The configuration file that holds the logging in strategy.
    @ameniawy
*/

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var crypto = require('crypto');
var Client = require('../models/client');
var strings = require('../controllers/helpers/strings');
var passportJWT = require("passport-jwt");
var InvalidToken = require('../models/invalidToken');
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/setupPassport').jwtOptions;

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
jwtOptions.passReqToCallback = true;

var strategy = new JwtStrategy(jwtOptions,
	function (req, jwt_payload, next) {
		User.findOne({
			_id: jwt_payload.user._id
		}).select('+password').exec((err, user) => {
			if (err) {
				return next(err.message, null);
			}
			if (!user) {
				return next(null, false);

			} else {

				InvalidToken.findOne({
					token: req.headers['authorization'].split(" ")[1]
				}).exec((err, token) => {
					if (err) {
						return next(err.message, false);
					}
					if (token) {
						return next("Invalid Credentials.", false);
					}

					next(null, user);
				})

			}
		})

	});

module.exports = function () {

	passport.use(strategy);

	/* 	This function generates a random hexadecimal value that will be appended to
		the end of the username to make it unique.
		@magdy
	*/

	function randomValueHex(len) {
		return crypto.randomBytes(Math.ceil(len / 2))
			.toString('hex') // convert to hexadecimal format
			.slice(0, len); // return required number of characters
	}

	/*
		facebook authentication @magdy
	*/
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});


	passport.use(new FacebookStrategy({
			clientID: process.env.FB_CLIENT_ID,
			clientSecret: process.env.FB_CLIENT_SECRET,
			callbackURL: process.env.FB_CALLBACK,
			profileFields: ['id', 'email', 'first_name', 'last_name', 'picture.height(400)'],
		},
		function (token, refreshToken, profile, done) {
			process.nextTick(function () {
				User.findOne({
					'facebook.id': profile.id
				}, function (err, user) {
					if (err)
						return done(err);
					if (user) {
						var payload = {
							user: user
						};
						var token = jwt.sign(payload, jwtOptions.secretOrKey);
						user.token = token;
						return done(null, user);
					} else {

						var createUser = function () {
							var newUser = new User();
							newUser.facebook.id = profile.id;
							newUser.facebook.token = token;
							newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
							newUser.email = (profile.emails[0].value || null).toLowerCase();
							var usernameString = (profile.emails[0].value || null).toLowerCase();
							newUser.username = (usernameString.substring(0, usernameString.indexOf('@')) + '' + randomValueHex(7) || null);
							newUser.profileImage = profile.photos[0].value;
							newUser.userType = 'Client';
							newUser.verified = 'verified';
							if (!newUser.username || !newUser.email) {
								return done(null, null);
							} else {
								newUser.save(function (err, user) {
									if (err)
										return done(err, null);
									var newClient = new Client();
									newClient.userId = user._id;
									newClient.save(function (err, client) {
										if (err)
											return done(err, null);
										else {
											var payload = {
												user: user
											};
											var token = jwt.sign(payload, jwtOptions.secretOrKey);
											user.token = token;
											return done(null, user);
										}
									});

								});
							}
						};

						if (profile.emails.length > 0) {
							User.findOne({
								email: profile.emails[0].value
							}, function (err, user) {

								if (err) {
									return done(err);
								}
								if (user) {
									var payload = {
										user: user
									};
									var token = jwt.sign(payload, jwtOptions.secretOrKey);
									user.token = token;
									return done(null, user);
								}
								createUser();
							});
						} else {
							createUser();
						}


					}
				});
			});
		}));
}

module.exports.jwtOptions = jwtOptions;