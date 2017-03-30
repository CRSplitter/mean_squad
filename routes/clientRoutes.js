var express = require('express');
var router = express.Router();
var clientController = require('../controllers/clientController');

// Posting a reservation
router.post('/reserve', userController.makeReservation);