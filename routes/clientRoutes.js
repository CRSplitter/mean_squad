var express = require('express');
var router = express.Router();
var clientController = require('../controllers/clientController');
var authMiddleware = require('../middlewares/authMiddleware');
var clientMiddleware = require('../middlewares/clientMiddleware');

// Posting a reservation
router.post('/reserve', authMiddleware, clientMiddleware, clientController.getClient, clientController.makeReservation);

// Getting current Reservations
router.get('/reservations', authMiddleware, clientMiddleware, clientController.getClient, clientController.viewReservations);

// Cancelling a reservation
router.post('/cancelReservation', authMiddleware, clientMiddleware, clientController.getClient, clientController.cancelReservation);

module.exports = router;