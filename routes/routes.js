// routes file
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

router.get('/', userController.index);
router.post('/add', userController.create);

module.exports = router;