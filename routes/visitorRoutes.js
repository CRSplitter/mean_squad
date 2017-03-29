var express = require('express');
var router = express.Router();
var promotionController = require('../controllers/promotion');
var businessController = require('../controllers/business');
var activityController = require('../controllers/activity');

router.get('/promotions', promotionController.viewPromotions);
router.get('/businesses', promotionController.viewBusinesses);
router.get('/activities', promotionController.viewActivities);

module.exports = router;