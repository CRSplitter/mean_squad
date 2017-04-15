var express = require('express');
var router = express.Router();
var passport = require("passport");
var activityController = require('../controllers/activityController');

/**
 * A GET route responsible for viewing an activity
 * @var /activity/{id} GET
 * @name /activity/{id} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {activity: Activity},
 *     errors: [Error]
 * }
 */
router.get('/:id', activityController.show);

module.exports = router;
