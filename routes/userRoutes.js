/*
    userRoutes file containing only the routes begining with /user/{url}
    @ameniawy
*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var userController = require('../controllers/userController');
var bodyParser = require('body-parser');
var authenticate = require('./ensureAuthenticated');
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');

/**
 * Multer Configurations
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        const buf = crypto.randomBytes(48);
        cb(null, Date.now() + buf.toString('hex') + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

// posting a registeration form 
router.post('/register', userController.register);

// posting a login form
router.post('/login', passport.authenticate("login"), userController.login);

//  post edit form
router.post('/edit', upload.single('image'),authenticate.ensureAuthenticated, userController.update);

// post foget password
router.post('/reset_password', userController.forgetPassword);

// get reset password
router.get('/reset/:token', userController.getResetPassword);

// post reset password
router.post('/reset/:token', userController.postResetPassword);

// passing a logout request
router.get('/logout', userController.logout);

module.exports = router;