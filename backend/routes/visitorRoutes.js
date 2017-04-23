var express = require('express');
var router = express.Router();
var promotionController = require('../controllers/promotionController');
var businessController = require('../controllers/businessController');
var activityController = require('../controllers/activityController');

/**
 * A GET route responsible for viewing all promotions.
 * @var /promotions GET
 * @name /promotions GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: { promotions: [Promotion] },
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/promotions', promotionController.viewPromotions);

/**
 * A GET route responsible for viewing all businesses.
 * @var /promotions GET
 * @name /promotions GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: { businesses: [Business]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/businesses', businessController.viewBusinesses);

/**
 * A GET route responsible for viewing all promotions of a certain activity.
 * @var /promotions/{id} GET
 * @name /promotions/{id} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {promotions: [Promotion]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/promotions/:id', promotionController.viewPromotionsOfAnActivity);

/**
 * A GET route responsible for viewing all promotions of a certain business.
 * @var /{businessId}/promotions GET
 * @name /{businessId}/promotions GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {promotions: [Promotion]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/:businessId/promotions', promotionController.viewPromotionsOfABusiness);


/**
 * A GET route responsible for viewing all activities.
 * @var /activities GET
 * @name /activities GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {activities: [Activity]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/activities', activityController.viewActivities);

/**
 * A GET route responsible for viewing 5 activities in a certain page.
 * @var /activities/page/{page} GET
 * @name /activities/page/{page} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {activities: [Activity]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/activities/page/:page', activityController.viewActivitiesPaginated);

/**
 * A GET route responsible for viewing 5 promotions in a certain page.
 * @var /promotions/page/{page} GET
 * @name /promotions/page/{page} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {promotions: [Promotion]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/promotions/page/:page', promotionController.viewPromotionsPaginated);

/**
 * A GET route responsible for viewing 5 businesses in a certain page.
 * @var /businesses/page/{page} GET
 * @name /businesses/page/{page} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {businesses: array of businesses},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/businesses/page/:page', businessController.viewBusinessesPaginated);


/**
 * A GET route responsible for viewing all activities of a certian business.
 * @var /promotions/{id} GET
 * @name /promotions/{id} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {activities: [Activity]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/activities/:id', activityController.viewActivitiesOfABusiness);

module.exports = router;
