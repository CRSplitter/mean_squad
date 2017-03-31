var express = require('express');
var router = express.Router();
var clientController = require('../controllers/clientController');

// Posting a reservation
router.post('/reserve', clientController.makeReservation);

// Getting current Reservations
router.get('/reservations', clientController.viewReservations);

// Cancelling a reservation
router.post('/cancelReservations', clientController.cancelReservation);

module.exports = router;