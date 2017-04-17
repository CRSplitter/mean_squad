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
 * A POST route responsible for TODO
 * @var /user/login POST
 * @name /user/login POST
 * @example The route expects a body Object in the following format
 * {
 * 		username: username of the user wishing to login,
 *		password: password of that username
 *
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     	msg: String showing a descriptive text,
 *     	errors: [Error],
 *		data: {user: user object}
 *	
 * }
 */
router.post('/login', userController.login);


/**
 * A POST route responsible for TODO
 * @var /user/reset_password POST
 * @name /user/reset_password POST
 * @example The route expects a body Object in the following format
 * {
 *     	email: email of the user wishing to reset his/her password
 * }
 * @example The route returns as a response an object in the following format
 * {
 *      msg: String showing a descriptive text,
 *      errors: TODO
 * }
 */
router.post('/reset_password', userController.forgetPassword);


/**
 * A GET route responsible for TODO
 * @var /user/reset/{toekn} GET
 * @name /user/reset/{toekn} GET
 * @example The route expects a body Object in the following format
 * {
 *     	token: reset token in the params
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.get('/reset/:token', userController.getResetPassword);


/**
 * A POST route responsible for TODO
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
 *     errors: TODO
 * }
 */
router.post('/reset/:token', userController.postResetPassword);


/**
 * A GET route responsible for TODO
 * @var /user/logout GET
 * @name /user/logout GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text
 * }
 */
router.get('/logout', authMiddleware,userController.logout);

/**
 * A GET route responsible for TODO
 * @var /user/logout GET
 * @name /user/logout GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text
 * }
 */
router.get('/getuserbyusername', authMiddleware,userController.getUserByUsername);

module.exports = router;