var stripe = require("stripe")("sk_test_nmXoMnH2qvx1taOCMpDbZKSj");
var Payment = require("../models/payment");
var strings = require("./helpers/strings");
var Reservation = require("../models/reservation");

/**
 * create a stripe charge, create a payment in the database
 * and update the reservation's status to Confirmed
 * 
 * @param {String} req.body.stripetoken
 * @param {Number} req.body.amount
 * @param {String} req.body.reservationId
 * 
 * @return {json} {errors:[{error}],msg}
 */

module.exports.charge = [
    /**
     * Update reservation status to Confirmed
     * 
     * @param {any} reservationId 
     */
    function updateReservationStatus(req, res, next) {
        // Token is created using Stripe.js or Checkout!
        // Get the payment token submitted by the form:
        var token = req.body.stripeToken;
        var amount = req.body.amount;
        var reservationId = req.body.reservationId;

        var query = {
            _id: reservationId,
            confirmed: "Pending"
        };

        var newData = {
            // Update
            confirmed: strings.RESERVATION_STATUS_CONFIRMED
        }

        Reservation.update(query, newData, (err, updated) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Nothing to Update"
                    }]
                });
            }
            if (!updated) {
                return res.json({
                    errors: [{
                        type: string.DATABASE_ERROR,
                        msg: "Nothing to Update."
                    }]
                });
            }

            next();

        });
    },

    function makeCharge(req, res, next) {

        var chargeInfo = {
            amount: req.body.amount,
            currency: "usd",
            description: "Example charge",
            source: req.body.stripeToken,
        }

        // Charge the user's card:
        var charge = stripe.charges.create(chargeInfo, (err, charge) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.PAYMENT_ERROR,
                        msg: err.message,
                    }]
                })

            } else {

                next();
            }

        });

    },

    /**
     * creates a database entry for the payment
     * 
     * @param {String} reservationId 
     * @param {Number} amount 
     * @param {function} callback 
     */
    function createPayment(req, res) {
        var payment = new Payment({
            amount: req.body.amount,
            reservationId: req.body.reservationId
        });
        payment.save((err, payment) => {

            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }

            if (!payment) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error Saving Payment.'
                    }]
                });
            }

            res.json({
                msg: "Success."
            });
        });
    }

]