/*
    The configuration file that holds the logging in strategy.
    @ameniawy
*/

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var crypto = require('crypto');
var Client = require('../models/client');
var strings = require('../controllers/helpers/strings');
var passportJWT = require("passport-jwt");
var InvalidToken = require('../models/invalidToken');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = '†0p$ecre†Ke¥';
jwtOptions.passReqToCallback = true;

var strategy = new JwtStrategy(jwtOptions,
	function (req, jwt_payload, next) {
		// usually this would be a database call:
		User.findOne({
			_id: jwt_payload.user._id
		}).exec((err, user) => {
			if (err) {
				next(err.message, null);
			}
			if (!user) {
				next(null, false);

			} else {

				InvalidToken.findOne({
					token: req.headers['authorization'].split(" ")[1]
				}).exec((err,token)=>{
					if(err){
						next(err.message, false);
					}

					if(token){
						next("Invalid Credentials." ,false);
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

	passport.use(new FacebookStrategy({
			clientID: configAuth.facebookAuth.clientID,
			clientSecret: configAuth.facebookAuth.clientSecret,
			callbackURL: configAuth.facebookAuth.callbackURL,
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
						return done(null, user);
					} else {
						var newUser = new User();
						newUser.facebook.id = profile.id;
						newUser.facebook.token = token;
						newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
						newUser.email = (profile.emails[0].value || null).toLowerCase();
						var usernameString = (profile.emails[0].value || null).toLowerCase();
						newUser.username = (usernameString.substring(0, usernameString.indexOf('@')) + '' + randomValueHex(7) || null);
						newUser.profileImage = profile.photos[0].value;
						newUser.userType = 'Client';
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
									else
										return done(null, client);
								});

							});
						}

					}
				});
			});
		}));
}

module.exports.jwtOptions = jwtOptions;