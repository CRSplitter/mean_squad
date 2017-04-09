var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');

/**
* A GET route to search for an activity.
* @var /search/activities GET
* @name /search/activities GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     data: TODO,
*     errors: TODO
* }
*/
router.get('/activities', searchController.searchActivities);

/**
* A GET route to search for a business.
* @var /search/businesses GET
* @name /search/businesses GET
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     data: TODO,
*     errors: TODO
* }
*/
router.get('/businesses', searchController.searchBusiness);

module.exports = router;
