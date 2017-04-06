/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy
*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var userController = require('../controllers/userController');
var authMiddleware = require('../middlewares/authMiddleware');

// posting a login form
router.post('/login', passport.authenticate("login"), userController.login);

// post foget password
router.post('/reset_password', userController.forgetPassword);

// get reset password
router.get('/reset/:token', userController.getResetPassword);

// post reset password
router.post('/reset/:token', userController.postResetPassword);

// passing a logout request
router.get('/logout', userController.logout);


module.exports = router;
