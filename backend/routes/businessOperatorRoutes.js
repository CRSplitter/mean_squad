/**
 * Business Operator routes.
 */
var express = require('express');
var router = express.Router();
var businessOperator = require('../controllers/businessOperatorController');
var businessOperatorController = require('../controllers/businessOperatorController');
var businessController = require('../controllers/businessController');
var userController = require('../controllers/userController');
var businessMiddleware = require('../middlewares/businessMiddleware');
var businessOperatorMiddleware = require('../middlewares/businessOperatorMiddleware');
var authMiddleware = require('../middlewares/authMiddleware');

/**
 * A GET route responsible for viewing the reservations of business operator business's.
 * @var /businessOperator/reservations GET
 * @name /businessOperator/reservations GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: TODO,
 *     errors: TODO
 * }
 */
router.get('/reservations',authMiddleware, businessOperator.viewReservations);


/**
 * A GET route responsible for viewing the activities of business operator business's.
 * @var /businessOperator/activities POST
 * @name /businessOperator/activities POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *     email,
 *     username,
 *     password,
 *     confirmPassword
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.get('/activities',authMiddleware, businessOperator.viewActivities);


/**
 * A GET route responsible for viewing the payments of business operator business's.
 * @var /businessOperator/payments GET
 * @name /businessOperator/payments GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *     TODO
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.get('/payments',authMiddleware, businessOperator.viewPayments);


/**
 * A GET route responsible for viewing the promotions of business operator business's.
 * @var /businessOperator/promotions GET
 * @name /businessOperator/promotions GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *     TODO
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.get('/viewpromotions',authMiddleware, businessOperator.viewPromotions);


/**
 * A POST route responsible for creating a reservation on behalf of a client
 * @var /businessOperator/createreservation POST
 * @name /businessOperator/createreservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *     TODO
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.post('/makeReservation', authMiddleware, businessOperatorMiddleware, businessOperator.makeReservation);


/**
 * A POST route responsible for registering a new business operator.
 * @var /businessOperator/register POST
 * @name /businessOperator/register POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business'.
 * @example The route expects a body Object in the following format
 * {
 *     email,
 *     username,
 *     password,
 *     confirmPassword
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{ type: error type(String),
 *                msg: error message(String)
 *              }]
 * }
 */
router.post('/register', authMiddleware, businessController.addBusiness, businessMiddleware, businessOperatorController.addType, userController.register, businessOperatorController.create);


/**
 * A POST route responsible for cancelling reservations.
 * @var /businessOperator/cancelReservation POST
 * @name /businessOperator/cancelReservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *    TODO
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.post('/cancelReservation', authMiddleware, businessOperatorController.cancelReservation);


/**
 * A POST route responsible for editing the reservations of a business operator.
 * @var /businessOperator/editReservation POST
 * @name /businessOperator/editReservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *     TODO
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.post('/editReservation', authMiddleware, businessOperatorController.editReservation);

module.exports = router;
