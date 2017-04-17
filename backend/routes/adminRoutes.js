/**
 * Site Admin routes.
 */
var adminController = require('../controllers/adminController');
var userController = require('../controllers/userController');
var adminMiddleware = require('../middlewares/adminMiddleware');
var authMiddleware = require('../middlewares/authMiddleware');
var helperFunctions = require('../controllers/helpers/functions');
var express = require('express');
var router = express.Router();


/**
 * A POST route responsible for registering an admin.
 * @var /admin/register POST
 * @name /admin/register POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route expects a body Object in the following format
 * {
 *     email: admin email(String),
 *     username: admin username(String),
 *     password: admin password(String),
 *     confirmPassword: password confirmation(String)
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/register', authMiddleware, adminMiddleware, adminController.addType, userController.register, adminController.create);


/**
 * A GET route responsible for viewing businesses waiting to be approved by admins.
 * @var /admin/viewBusinessRequests GET
 * @name /admin/viewBusinessRequests GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}],
 *     data: {businesses:[businessObject]}
 * }
 */
router.get('/viewBusinessRequests', authMiddleware, adminMiddleware, adminController.viewBusinessRequests);


/**
 * A POST route responsible for reseting the balance of the business
 * @var /resetBalance POST
 * @name /resetBalance POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route expects a body Object in the following format
 * {
 *     businessId
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/resetBalance', authMiddleware, adminMiddleware, adminController.resetBalance);

router.get('/resetSlots', helperFunctions.resetSlots);

/**
 * A POST route responsible for accept/reject business request
 * @var /acceptBusiness/:id POST
 * @name /acceptBusiness/:id POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route expects a body Object in the following format
 * {
 *     businessId
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/acceptBusiness/:id', authMiddleware, adminMiddleware, adminController.accept);
router.post('/rejectBusiness/:id', authMiddleware, adminMiddleware, adminController.reject);

module.exports = router;