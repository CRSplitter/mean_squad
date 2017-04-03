var express = require('express');
var router = express.Router();
var businessController = require('../controllers/businessController');


router.get('/createPromotion', businessController.createPromotion);

router.get('/editPromotion', businessController.editPromotion);

router.get('/removePromotion', businessController.removePromotion);


module.exports = router;