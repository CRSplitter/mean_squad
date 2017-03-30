/**
 * Admin routes.
 * @param  {Router} router
 */
module.exports = function(router) {
    var BusinessController = require('../controllers/businessController');

    /**
    * A POST route responsible for promoting a user.
    * @var /user/promote POST
    * @name /user/promote POST
    * @example The user requesting the route has to be of type 'Business' or 'Admin'.
    * @example The route expects a body Object in the following format
    * {
    *   id: user identifier (String) [required]
    *   userType: user type (String, one of these ['Operator']) [required]
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
    app.post('/business/promote', BusinessController.promote);

};
