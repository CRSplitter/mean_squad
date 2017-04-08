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
/**
* A POST route responsible for TODO
* @var /user/TODO POST
* @name /user/TODO POST
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: TODO
* }
*/
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
