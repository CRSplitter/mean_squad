/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy
*/
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
//var passport = require("passport");

// posting a registeration form 
router.post('/register', userController.register);

// posting a login form
router.post('/login', userController.login);

// passing a logout request
router.get('/logout', userController.logout);