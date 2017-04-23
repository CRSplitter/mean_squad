var express = require('express');
var passport = require('passport');
var router = express.Router();
var strings = require('../controllers/helpers/strings');
var authMiddleware = require('../middlewares/authMiddleware');
var userController = require('../controllers/userController');
var getTokenMiddleware = require('../middlewares/getTokenMiddleware');

/**
* A GET route FB login route
* @var /login/auth/facebook GET
* @name /login/auth/facebook GET
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: [Error]
* }
*/
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));




/**
* A GET route for FB callback route
* @var /login/auth/facebook/callback GET
* @name /login/auth/facebook/callback GET
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: [Error]
* }
*/
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  session :false,
  failureRedirect: '/login/failed'
}), function(req,res){
    var token = req.user.token
    res.redirect('http://35.160.199.92:8080/facebook/?token='+token)
});



/**
* A GET rotue for FB auth failure
* @var /login/failed GET
* @name /login/failed GET
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: [Error]
* }
*/
router.get('/failed', function(req, res, next) {
      return res.redirect('http://localhost:8000/facebook/?token=0')
});


/**
* A GET route FB token route
* @var /login/facebook/token GET
* @name /login/facebook/token GET
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: [Error],
*     data: {user: user object}
* }
*/
router.get('/facebook/token/:token',getTokenMiddleware,authMiddleware, userController.loginFacebook);

module.exports = router;
