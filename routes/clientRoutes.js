var express = require('express');
var router = express.Router();
var passport = require("passport");
var clientController = require('../controllers/clientController');

// post edit form
router.post('/edit', passport.authenticate("login"), clientController.update);

module.exports = router;