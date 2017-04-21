var InvalidToken = require('../models/invalidToken');
var Strings = require('../controllers/helpers/strings')
/**
 * get the Token from the query and add it to the header
 * then adds makes the token invalid
 * @IOElgohary
 */
module.exports = function (req, res, next) {

    req.body.token = req.params.token
    req.headers.authorization = "JWT " + req.body.token;
    next();
}