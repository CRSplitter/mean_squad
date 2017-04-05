var express = require('express');
var router = express.Router();
var passport = require('passport');
var promotionController = require('../controllers/promotionController');
var businessController = require('../controllers/businessController');
var activityController = require('../controllers/activityController');

router.get('/promotions', promotionController.viewPromotions);
router.get('/businesses', businessController.viewBusinesses);
router.get('/activities', activityController.viewActivities);

module.exports = router;
