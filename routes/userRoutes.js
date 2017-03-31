/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy
*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var userController = require('../controllers/userController');

// posting a registeration form
router.post('/register', userController.register);

// posting a login form
router.post('/login', passport.authenticate("login"), userController.login);

// passing a logout request
router.get('/logout', userController.logout);

router.get('/viewActivity/:activityName', userController.viewActivity);



module.exports = router;
