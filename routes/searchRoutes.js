var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');

router.get('/activities', searchController.searchActivities);
router.get('/businesses', searchController.searchBusiness);

module.exports = router;