var express = require('express');
var router = express.Router();
var passport = require("passport");
var businessController = require('../controllers/businessController');

// post edit form
router.post('/edit', passport.authenticate("login"), businessController.update);

module.exports = router;