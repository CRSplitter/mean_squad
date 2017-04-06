/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy, ielgohary
*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var userController = require('../controllers/userController');
var authMiddleware = require('../middlewares/authMiddleware');

// POST a login form
router.post('/login', passport.authenticate("login"), userController.login);

// POST foget password
router.post('/reset_password', userController.forgetPassword);

// GET reset password
router.get('/reset/:token', userController.getResetPassword);

// POST reset password
router.post('/reset/:token', userController.postResetPassword);

// GET logged in user requesting a logout
router.get('/logout', userController.logout);


module.exports = router;
