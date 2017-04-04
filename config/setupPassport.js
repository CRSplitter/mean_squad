/*
    The configuration file that holds the logging in strategy.
    @ameniawy
*/
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var crypto = require('crypto');


module.exports = function() {
	passport.use("login", new LocalStrategy(
		function(username, password, done){
			User.findOne({ username: username}).select('password').exec(function(err, user){
				if(err) return done(err);
				if(!user){
					return done(null, false, {message: "No user with that username!"});
				}
				user.checkPassword(password, function(err, isMatch){
					if(err) return done(err);
					if(isMatch){
						return done(null, user);
					} else{
						return done(null, false, {message:"Invalid Password"});
					}
				});
			});

		}));
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

/* This function generates a random hexadecimal value that will be appended to
	 the end of the username to make it unique.
 */
	function randomValueHex (len) {
	    return crypto.randomBytes(Math.ceil(len/2))
	        .toString('hex') // convert to hexadecimal format
	        .slice(0,len);   // return required number of characters
	}

//	var value1 = randomValueHex(12)  value 'd5be8583137b'
//	var value2 = randomValueHex(2)   value 'd9'
//	var value3 = randomValueHex(7)   value 'ad0fc8c'

	//Facebook

	passport.use(new FacebookStrategy({
	clientID: configAuth.facebookAuth.clientID,
	clientSecret: configAuth.facebookAuth.clientSecret,
	callbackURL: configAuth.facebookAuth.callbackURL,
	profileFields: ['id', 'email', 'first_name', 'last_name', 'photos'],
},
function(token, refreshToken, profile, done) {
	process.nextTick(function() {
		User.findOne({ 'facebook.id': profile.id }, function(err, user) {
			if (err)
				return done(err);
			if (user) {
				return done(null, user);
			} else {
				var newUser = new User();
				newUser.facebook.id = profile.id;
				newUser.facebook.token = token;
				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
			  //newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
				newUser.email = (profile.emails[0].value || null).toLowerCase();
				var usernameString = (profile.emails[0].value || null).toLowerCase();
				newUser.username = (usernameString.substring(0,usernameString.indexOf('@')) + '' + randomValueHex(7) || null);
				newUser.facebook.picture = profile.photos[0].value;
				//console.log(newUser);
				if (!newUser.username || !newUser.email) {
							return done(null, null);
				} else {
					newUser.save(function(err) {
						if (err)
							return done(err, null);
						return done(null, newUser);
					});
				}

			}
		});
	});
}));


};
