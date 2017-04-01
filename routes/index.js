var express = require('express');
var passport = require('passport');
var router = express.Router();


router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/bla',
  failureFlash: 'true'
}));

router.get('/profile', function(req, res) {
  res.send("logged in successfully");
});

router.get('/', function(req, res, next) {
  res.send("this is the homepage");
});


module.exports = router;
