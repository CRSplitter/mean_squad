/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy
*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var userController = require('../controllers/userController');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// posting a registeration form 
router.post('/register', userController.register);

// posting a login form
router.post('/login', passport.authenticate("login"), userController.login);

//  post edit form
router.post('/edit', userController.update);

// passing a logout request
router.get('/logout', userController.logout);

module.exports = router;