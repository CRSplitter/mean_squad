var express = require('express');
var router = express.Router();
var promotionController = require('../controllers/promotionController');
var businessController = require('../controllers/businessController');
var activityController = require('../controllers/activityController');

/**
* A GET route responsible for viewing all promotions.
* @var /promotions GET
* @name /promotions GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     data: TODO
*     errors: TODO
* }
*/
router.get('/promotions', promotionController.viewPromotions);

/**
* A GET route responsible for viewing all businesses.
* @var /promotions GET
* @name /promotions GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     data: TODO
*     errors: TODO
* }
*/
router.get('/businesses', businessController.viewBusinesses);

// GET visitor viewing promotions of a certain activity
router.get('/promotions/:id', promotionController.viewPromotionsOfAnActivity);

/**
* A GET route responsible for viewing all activities.
* @var /promotions GET
* @name /promotions GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     data: TODO
*     errors: TODO
* }
*/
router.get('/activities', activityController.viewActivities);

// GET visitor viewing all activities
router.get('/activities/:id', activityController.viewActivitiesOfABusiness);

module.exports = router;
