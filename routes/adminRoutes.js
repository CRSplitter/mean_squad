/**
 * Admin routes.
 * @param  {Router} router
 */
module.exports = function(router) {
    var AdminController = require('../controllers/adminController');
    var AdminMiddleware = require('../middlewares/adminMiddleware');

    /**
    * A POST route responsible for promoting a user to become an admin.
    * @var /admin/promote POST
    * @name /admin/promote POST
    * @example The user requesting the route has to be of type 'Admin'.
    * @example The route expects a body Object in the following format
    * {
    *   id: user identifier (String) [required]
    *   userType: user type (String, one of these ['Admin']) [required]
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
    app.post('/admin/promote', AdminMiddleware, AdminController.promote);

};
