/**
 * Admin routes.
 * @param  {Express} app
 */
module.exports = function(app) {
    var AdminController = require('../controllers/adminController');
    var AdminMiddleware = require('../middlewares/adminMiddleware');

    /**
    * A POST route responsible for promoting a user to become an admin.
    * @var /admin/promote POST
    * @name /admin/promote POST
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
    app.post('/admin/register', AdminMiddleware, AdminController.register);

};
