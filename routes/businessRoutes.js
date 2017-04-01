/**
 * Business routes.
 * @param  {Router} router
 */
module.exports = function(router) {
    var BusinessOperatorController = require('../controllers/businessOperatorController');
    var BusinessMiddleware = require('../middlewares/BusinessMiddleware');

    /**
    * A PUT route responsible for updating the type approved attribute of a business.
    * @var /business/{id}/accept PUT
    * @name /business/{id}/accept PUT
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
    app.post('/business/:id/accept', AdminMiddleware, AdminController.accept);

    /**
    * A DELETE route responsible for rejecting a business.
    * @var /business/{id}/reject PUT
    * @name /business/{id}/reject PUT
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
    app.post('/business/:id/reject', AdminMiddleware, AdminController.accept);

};
