/**
 * Business Operator routes.
 */
var express = require('express');
var router = express.Router();
var businessOperator = require('../controllers/businessOperatorController');
var BusinessOperatorController = require('../controllers/businessOperatorController');
var businessController = require('../controllers/businessController');
var UserController = require('../controllers/userController');
var BusinessMiddleware = require('../middlewares/businessMiddleware');
var AuthMiddleware = require('../middlewares/authMiddleware');

// GET logged in business operator viewing his business's reservations
router.get('/reservations', businessOperator.viewReservations);

// GET logged in business operator viewing his business's activities 
router.get('/activities', businessOperator.viewActivities);

// GET logged in business operator viewing his business's payments
router.get('/payments', businessOperator.viewPayments);

// GET logged in business operator viewing his business's promotions
router.get('/promotions', businessOperator.viewPromotions);

// POST logged in business operator creating a reservation on behalf of a client
router.post('/createreservation', businessOperator.createReservation);

/**
* A POST route responsible for register a new business operator.
* @var /businessOperator/register POST
* @name /businessOperator/register POST
* @example The user requesting the route has to be logged in.
* @example The user requesting the route has to be of type 'Business'.
* @example The route expects a body Object in the following format
* {
*  email,
*  username,
*  password,
*  confirmPassword
* }
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
// POST logged in  business creating a new business operatior 
router.post('/register', AuthMiddleware, businessController.addBusiness, BusinessMiddleware, BusinessOperatorController.addType, UserController.register, BusinessOperatorController.create);

// POST logged in business operator cancelling a reservations
router.post('/cancelReservation', AuthMiddleware, BusinessOperatorController.cancelReservation);

// POST logged in business operator editing a reservations
router.post('/editReservation', AuthMiddleware, BusinessOperatorController.editReservation);

module.exports = router;
