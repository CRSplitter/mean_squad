/* 
    routes file specific to the business only not other users
    @carsoli 
*/
var express = require('express');
var router = express.Router();
var businessController = require('../controllers/businessController');
var authMiddleware = require('./middlewares/authMiddleware');
var businessMiddleware = require('./middlewares/businessMiddleware');

/*retrieve a summary of Activities offered by this business*/
router.get('/viewMyActivities', authMiddleware , businessMiddleware ,businessController.appendBusiness, businessController.viewMyActivities);


/*post a form with all required Activity details*/
router.post('/addActivity', authMiddleware , businessMiddleware, businessController.appendBusiness, businessController.addActivity);


/*request the deletion of a selected activity that belongs to the busienss*/
router.get('/removeActivity', authMiddleware , businessMiddleware, businessController.appendBusiness, businessController.removeActivity);


/*post a form with the updated && old info for an activity*/
router.post('/editActivity', authMiddleware , businessMiddleware, businessController.appendBusiness, businessController.editActivity);


/*request a summary of promotions offered by this business*/
router.get('/viewMyPromotions', authMiddleware , businessMiddleware, businessController.appendBusiness, businessController.viewMyPromotions);


module.exports = router;