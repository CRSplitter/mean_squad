var express = require('express');
var passport = require('passport');
var router = express.Router();
var strings = require('../controllers/helpers/strings');

// FB login route
/**
* A GET route responsible for TODO
* @var /login/auth/facebook GET
* @name /login/auth/facebook GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: TODO
* }
*/
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// FB callback route
/**
* A GET route responsible for TODO
* @var /login/auth/facebook/callback GET
* @name /login/auth/facebook/callback GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: TODO
* }
*/
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed',
  failureFlash: 'true'
}));


// success page route
/**
* A GET route responsible for TODO
* @var /login/success GET
* @name /login/success GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: TODO
* }
*/
router.get('/success', function(req, res) {
    res.json({
        msg: 'Logged in with facebook successfully'
    });
});


// failure page route
/**
* A GET route responsible for TODO
* @var /login/failed GET
* @name /login/failed GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: TODO
* }
*/
router.get('/failed', function(req, res, next) {
      return res.json({
              errors: [{
                  type:'Auth Error',
                  msg: 'Logging in with facebook failed'
              }]
          });
});


module.exports = router;
