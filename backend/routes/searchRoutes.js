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
 *     data: data: {activities: [
 *             name: Activity title(String),
 *             description: Activity description(String),
 *             price: Activity price(Number),
 *             maxParticipants: Activity max participants(Number),
 *             minParticipants: Activity min participants(Number),
 *             minAge: Activity min age(Number),
 *             durationHours: Activity duration in hours(Number),
 *             durationMinutes: Activity duration in minutes(Number),
 *             avgRating: Activity average rating(Number),
 *             images: Activity images(String),
 *             activityType: Activity title(String),
 *             activitySlots: [
 *                         day: String,
 *                         slots: [{
 *                             time: String,
 *                             maxParticipants: Number,
 *                             currentParticipants: Number
 *                         }]] ,
 *             businessId:
 *             {
 *                 name: name of business(String),
 *                 description: description(String),
 *                 address: address(String),
 *                 latitude: location latitude(Number),
 *                 longitude: location longitude(Number),
 *                 contactInfo: contactInfo(String),
 *                 userId: User
 *             }
 *         }
 *     ]},
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
