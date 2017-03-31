var express = require('express');
var router = express.Router();
var passport = require('passport');
var clientController = require('../controllers/clientController');

// Posting a reservation
router.post('/reserve', passport.authenticate('login'), clientController.makeReservation);

// Getting current Reservations
router.get('/reservations', passport.authenticate('login'), clientController.viewReservations);

// Cancelling a reservation
router.post('/cancelReservations', passport.authenticate('login'), clientController.cancelReservation);

module.exports = router;