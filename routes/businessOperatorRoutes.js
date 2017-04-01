/**
 * Business Operator routes.
 * @param  {Express} app
 */
module.exports = function(app) {
    var BusinessOperatorController = require('../controllers/businessOperatorController');
    var BusinessMiddleware = require('../middlewares/businessMiddleware');

    /**
    * A POST route responsible for register a new business operator.
    * @var /businessOperator/register POST
    * @name /businessOperator/register POST
    * @example The user requesting the route has to be of type 'Business'.
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
    app.post('/businessOperator/register', BusinessMiddleware, BusinessOperatorController.register);

};
