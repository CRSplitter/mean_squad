var express = require('express');
var router = express.Router();
var promotionController = require('../controllers/promotionController');
var businessController = require('../controllers/businessController');
var activityController = require('../controllers/activityController');

// GET visitor viewing all promotions
router.get('/promotions', promotionController.viewPromotions);

// GET visitor viewing promotions of a certain activity
router.get('/promotions/:id', promotionController.viewPromotionsOfAnActivity);

// GET visitor viewing all businesses
router.get('/businesses', businessController.viewBusinesses);

// GET visitor viewing all activities
router.get('/activities', activityController.viewActivities);

// GET visitor viewing all activities
router.get('/activities/:id', activityController.viewActivitiesOfABusiness);

module.exports = router;
