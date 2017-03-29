/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy
*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var userController = require('../controllers/userController');
//var passport = require("passport");

// posting a registeration form 
router.post('/register', userController.register);

// posting a login form
router.post('/login', passport.authenticate("login"), userController.login);
// router.post("/login", passport.authenticate("login", {failureRedirect: "/user/login", failureFlash: true}), 
// 	function(req, res) {
//     	res.json({message: "user logged in"});
// });

// passing a logout request
router.get('/logout', userController.logout);

module.exports = router;