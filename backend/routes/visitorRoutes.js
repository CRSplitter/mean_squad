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

/**
 * A GET route responsible for viewing all promotions of a certain activity.
 * @var /promotions/{id} GET
 * @name /promotions/{id} GET
 * @example The route expects a body Object in the following format
 * {
 *       id: id of the activity in params
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {promotions: array of promotions}
 *     errors: TODO
 * }
 */
router.get('/promotions/:id', promotionController.viewPromotionsOfAnActivity);

/**
 * A GET route responsible for viewing all promotions of a certain business.
 * @var /{businessId}/promotions GET
 * @name /{businessId}/promotions GET
 * @example The route expects a body Object in the following format
 * {
 *       id: id of the activity in params
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {promotions: array of promotions}
 *     errors: TODO
 * }
 */
router.get('/:businessId/promotions', promotionController.viewPromotionsOfABusiness);


/**
 * A GET route responsible for viewing all activities.
 * @var /activities GET
 * @name /activities GET
 * @example The route expects a body Object in the following format
 * {
 *     
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {activities: array of activities}
 *     errors: TODO
 * }
 */
router.get('/activities', activityController.viewActivities);


/**
 * A GET route responsible for viewing all activities of a certian business.
 * @var /promotions/{id} GET
 * @name /promotions/{id} GET
 * @example The route expects a body Object in the following format
 * {
 *       id: id of the business in the params
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {activities: array of activities}
 *     errors: TODO
 * }
 */
router.get('/activities/:id', activityController.viewActivitiesOfABusiness);

module.exports = router;