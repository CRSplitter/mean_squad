/**
 * Business Operator routes.
 */
var AdminController = require('../controllers/adminController');
var UserController = require('../controllers/userController');
var AdminMiddleware = require('../middlewares/adminMiddleware');
var AuthMiddleware = require('../middlewares/authMiddleware');
var express = require('express');
var router = express.Router();


/**
* A POST route responsible for promoting a user to become an admin.
* @var /admin/register POST
* @name /admin/register POST
* @example The user requesting the route has to be logged in.
* @example The user requesting the route has to be of type 'Admin'.
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
router.post('/register', AuthMiddleware, AdminMiddleware, AdminController.addType, UserController.register, AdminController.create);
router.post('/viewBusinessRequests', AuthMiddleware, AdminMiddleware, AdminController.viewBusinessRequests);

module.exports = router;
