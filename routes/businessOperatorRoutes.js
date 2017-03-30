var express = require('express');
var router = express.Router();
var businessOperator = require('../controllers/businessOperatorController');

router.get('/reservations', businessOperator.viewReservations);
router.get('/activities', businessOperator.viewActivities);
router.get('/payments', businessOperator.viewPayments);
router.get('/promotions', businessOperator.viewPromotions);
router.post('/createreservation', businessOperator.createReservation);



module.exports = router;