var express = require('express');
var router = express.Router();
var passport = require('passport');
var promotionController = require('../controllers/promotionController');
var businessController = require('../controllers/businessController');
var activityController = require('../controllers/activityController');

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

router.get('/promotions', promotionController.viewPromotions);
router.get('/businesses', businessController.viewBusinesses);
router.get('/activities', activityController.viewActivities);

module.exports = router;
