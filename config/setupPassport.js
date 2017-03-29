/*
    The configuration file that holds the logging in strategy.
    @ameniawy
*/
var mongoose = require('mongoose');
var User  = mongoose.model('User');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var configAuth = require('./facebookAuth');
//var FacebookStrategy = require('passport-facebook').Strategy;
//var FacebookUser = mongoose.model('facebookUser');

module.exports = function() {
	passport.use("login", new LocalStrategy(
		function(username, password, done){
			User.findOne({ username: username}, function(err, user){
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
	
/*	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function(){
			FacebookUser.findOne({'id':profile.id}, function(err, user){
				if(err) return done(err);
				if(user) return done(null, user);
				else {
					var newUser = new FacebookUser();
					newUser.id = profile.id;
					newUser.token = profile.token;
					newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
					//newUser.email = profile.emails[0].value;

					newUser.save(function(err){
						if(err) throw err;
						else{
							return done(null, newUser);
						}
					});
				}
			});
		});
	}
	));*/
	

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

};