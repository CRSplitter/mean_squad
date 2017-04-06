var express = require('express');
var router = express.Router();
var promotionController = require('../controllers/promotionController');
var businessController = require('../controllers/businessController');
var activityController = require('../controllers/activityController');

// GET visitor viewing all promotions
router.get('/promotions', promotionController.viewPromotions);

// GET visitor viewing all businesses
router.get('/businesses', businessController.viewBusinesses);

// GET visitor viewing all activities
router.get('/activities', activityController.viewActivities);

module.exports = router;
