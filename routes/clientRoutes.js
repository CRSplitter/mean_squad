var express = require('express');
var router = express.Router();
var passport = require('passport');
var clientController = require('../controllers/clientController');

// Posting a reservation
router.post('/reserve', clientController.ensureAuthentication, clientController.makeReservation);

// Getting current Reservations
router.get('/reservations', clientController.ensureAuthentication, clientController.viewReservations);

// Cancelling a reservation
router.post('/cancelReservations', clientController.ensureAuthentication, clientController.cancelReservation);

module.exports = router;