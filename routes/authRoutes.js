var express = require('express');
var passport = require('passport');
var router = express.Router();
var strings = require('../controllers/helpers/strings');


router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed',
  failureFlash: 'true'
}));

router.get('/success', function(req, res) {
    res.json({
        msg: 'Logged in with facebook successfully'
    });
});

router.get('/failed', function(req, res, next) {
      return res.json({
              errors: [{
                  type:'Auth Error',
                  msg: 'Logging in with facebook failed'
              }]
          });
});


module.exports = router;
