var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');

// GET visitor search for an activity
router.get('/activities', searchController.searchActivities);

// GET visitor search for a business
router.get('/businesses', searchController.searchBusiness);

module.exports = router;