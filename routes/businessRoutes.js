/* 
    routes file specific to the business only not other users
    @carsoli /@khattab
*/
var express = require('express');
var router = express.Router();
var businessController = require('../controllers/businessController');
var authMiddleware = require('../middlewares/authMiddleware');
var businessMiddleware = require('../middlewares/businessMiddleware');
var adminController = require('../controllers/adminController');
var adminMiddleware = require('../middlewares/adminMiddleware');

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


/**
* A PUT route responsible for updating the type approved attribute of a business.
* @var /business/{id}/accept PUT
* @name /business/{id}/accept PUT
* @example The user requesting the route has to be logged in.
* @example The user requesting the route has to be of type 'Admin'.
* @example The route returns as a response an object in the following format
* {
*   status: succeeded/failed,
*   message: String showing a descriptive text,
*   errors:
*   [
*    {
*       param: the field that caused the error,
* 	    value: the value that was provided for that field,
* 	    msg: the type of error that was caused (one of these ['required', 'not valid'])
* 	 }, {...}, ...
*   ]
* }
*/
router.post('/:id/accept', authMiddleware, AdminMiddleware, adminController.accept);a

/**
* A DELETE route responsible for rejecting a business.
* @var /business/{id}/reject PUT
* @name /business/{id}/reject PUT
* @example The user requesting the route has to be logged in.
* @example The user requesting the route has to be of type 'Admin'.
* @example The route returns as a response an object in the following format
* {
*   status: succeeded/failed,
*   message: String showing a descriptive text,
*   errors:
*   [
*    {
*       param: the field that caused the error,
* 	    value: the value that was provided for that field,
* 	    msg: the type of error that was caused (one of these ['required', 'not valid'])
* 	 }, {...}, ...
*   ]
* }
*/
router.delete('/:id/reject', authMiddleware, AdminMiddleware, adminController.reject);a
module.exports = router;