/**
 * Business routes.
 */
var AdminController = require('../controllers/adminController');
var AdminMiddleware = require('../middlewares/adminMiddleware');
var AuthMiddleware = require('../middlewares/authMiddleware');
var express = require('express');
var router = express.Router();

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
router.post('/:id/accept', AuthMiddleware, AdminMiddleware, AdminController.accept);


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
router.delete('/:id/reject', AuthMiddleware, AdminMiddleware, AdminController.reject);

module.exports = router;
