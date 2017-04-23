var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');

/**
 * A GET route to search for an activity.
 * @var /search/activities GET
 * @name /search/activities GET
 * @example The route expects a body Object in the following format
 * {
 *     q: query param containing a search string
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: data: {activities: [Activity]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/activities', searchController.searchActivities);

/**
 * A GET route to search for a business.
 * @var /search/businesses GET
 * @name /search/businesses GET
 * @example The route expects a body Object in the following format
 * {
 *     q: query param containing a search string
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {businesses: [Business]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/businesses', searchController.searchBusiness);

module.exports = router;