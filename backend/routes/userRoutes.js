/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy, ielgohary
*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var userController = require('../controllers/userController');
var authMiddleware = require('../middlewares/authMiddleware');

/**
 * A POST route responsible for logging in
 * @var /user/login POST
 * @name /user/login POST
 * @example The route expects a body Object in the following format
 * {
 * 		username: username of the user wishing to login,
 *		password: password of that username
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     	msg: String showing a descriptive text,
 *		data: {user: user object},
 *		errors: [{type: String, msg: String}]
 * }
 */
router.post('/login', userController.login);

/**
 * A POST route responsible for logging in
 * @var /user/getById POST
 * @name /user/getById POST
 * @example The route expects a body Object in the following format
 * {
 * 		userId
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     	msg: String showing a descriptive text,
 *		data: {user: user object},
 *		errors: [{type: String, msg: String}]
 * }
 */
router.post('/getById', userController.getUserObject);


/**
 * A GET route responsible for verifying User's email
 * @var /user/verify/{token} GET
 * @name /user/verify/{token} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/verify/:token', userController.verifyEmail);


router.post('/register', userController.register);
/**
 * A POST route responsible for resetting password
 * @var /user/reset_password POST
 * @name /user/reset_password POST
 * @example The route expects a body Object in the following format
 * {
 *     	email: email of the user wishing to reset his/her password
 * }
 * @example The route returns as a response an object in the following format
 * {
 *      msg: String showing a descriptive text,
 *      errors: [{type: String, msg: String}]
 * }
 */
router.post('/reset_password', userController.forgetPassword);


/**
 * A GET route responsible for resetting password
 * @var /user/reset/{toekn} GET
 * @name /user/reset/{toekn} GET
 * @example The route expects a body Object in the following format
 * {
 *     	token: reset token in the params
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/reset/:token', userController.getResetPassword);


/**
 * A POST route responsible for resetting password
 * @var /user/reset/{token} POST
 * @name /user/reset/{token} POST
 * @example The route expects a body Object in the following format
 * {
 *       token: reset token in the params,
 *       password: new password in the body
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/reset/:token', userController.postResetPassword);


/**
 * A GET route responsible for logging out
 * @var /user/logout GET
 * @name /user/logout GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/logout', authMiddleware,userController.logout);

/**
 * A GET route to get a user by his username
 * @var /user/getuserbyusername GET
 * @name /user/getuserbyusername GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: User,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/getuserbyusername',userController.getUserByUsername);

module.exports = router;
