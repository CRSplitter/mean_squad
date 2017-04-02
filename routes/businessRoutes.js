/* 
    routes file specific to the business only not other users
    @carsoli 
*/
var express = require('express');
var router = express.Router();
var businessController = require('../controllers/businessController');


/*retrieve a summary of Activities offered by this business*/
router.get('/viewMyActivities', businessController.viewMyActivities);


/*post a form with all required Activity details*/
router.post('/addActivity', businessController.addActivity);


/*request the deletion of a selected activity that belongs to the busienss*/
router.get('/removeActivity', businessController.removeActivity);


/*post a form with the updated && old info for an activity*/
router.post('/editActivity', businessController.editActivity);


/*request a summary of promotions offered by this business*/
router.get('/viewMyPromotions', businessController.viewMyPromotions);


module.exports = router;