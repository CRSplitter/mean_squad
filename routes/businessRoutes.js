/** 
    @description: routes file specific to the business only not other users
    @khattab /@carsoli
*/
var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var userController = require('../controllers/userController');
var businessController = require('../controllers/businessController');
var authMiddleware = require('../middlewares/authMiddleware');
var businessMiddleware = require('../middlewares/businessMiddleware');
var adminMiddleware = require('../middlewares/adminMiddleware');

/* registers a business user */
router.post('/register', businessController.addType, userController.register, businessController.create);

/*retrieve a summary of Activities offered by this business*/
router.get('/viewMyActivities', authMiddleware, businessController.addBusiness, businessMiddleware , businessController.viewMyActivities);

/*post a form with all required Activity details*/
router.post('/addActivity', authMiddleware, businessController.addBusiness, businessMiddleware,  businessController.addActivity);

/*request the deletion of a selected activity that belongs to the busienss*/
router.post('/removeActivity', authMiddleware , businessController.addBusiness, businessMiddleware,  businessController.removeActivity);

/*post a form with the updated && old info for an activity*/
router.post('/editActivity', authMiddleware , businessController.addBusiness, businessMiddleware, businessController.editActivity);

/*request a summary of promotions offered by this business*/
router.get('/viewMyPromotions', authMiddleware ,businessController.addBusiness, businessMiddleware, businessController.viewMyPromotions);

// post edit form
router.post('/edit', authMiddleware, businessMiddleware, businessController.update);


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
router.post('/:id/accept', authMiddleware, adminMiddleware, adminController.accept);

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
router.delete('/:id/reject', authMiddleware, adminMiddleware, adminController.reject);
module.exports = router;