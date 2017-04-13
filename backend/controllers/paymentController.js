var stripe = require("stripe")("sk_test_nmXoMnH2qvx1taOCMpDbZKSj");
var Payment = require("../models/payment");
var strings = require("./helpers/strings");
var Reservation = require("../models/reservation");
var nodemailer = require('nodemailer');
var email = require('../config/email');


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

        Reservation.findById(reservationId, (err, reservation) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Nothing to Update"
                    }]
                });
            }
            if (!reservation) {
                return res.json({
                    errors: [{
                        type: string.DATABASE_ERROR,
                        msg: "Nothing to Update."
                    }]
                });
            }

            if (reservation.confirmed != strings.RESERVATION_STATUS_PENDING) {
                console.log(reservation.confirmed);
                console.log("balabiso");
                console.log(strings.RESERVATION_STATUS_PENDING);
                return res.json({
                    errors: [{
                        type: strings.PAYMENT_ERROR,
                        msg: "Reservation is either Confirmed, Cancelled or Expired."
                    }]
                });
            }
            reservation.confirmed = strings.RESERVATION_STATUS_CONFIRMED;
            reservation.save((err, reservation)=>{
                if(err){
                    return res.json({
                        errors:[{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    })
                }
                req.body.reservation = reservation;
                next()
            })
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
    function createPayment(req, res, next) {
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
            next();
            
        });
    },
    sendPaymentDetailsToClient

]


/**
 * Send detials of the payment to the client
 * 
 * @param {any} req 
 * @param {any} res 
 */
function sendPaymentDetailsToClient(req, res) {


    var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: email.email,
            pass: email.password
        }

    });
    var mailOptions = {
        to: 'islam.o.elgohary@gmail.com',//TODO: generic email
        from: 'payment@noreply.com',
        subject: 'Reservation Confirmation',
        text: 'Reservation Confirmed Successfully.\n\n' +
            'Amount Paid: ' + req.body.amount + '\n' +
            'Reservation Details: ' + req.body.reservation.details + '\n\n' +
            'Number of Participants: ' + req.body.reservation.countParticipants + '\n\n' +
            'Reservation Time: ' + req.body.reservation.time + '\n\n' +
            'Please keep this email as a proof of your payment.\n\n'

    };

    smtpTransport.sendMail(mailOptions, function (err) {

        if (err)
            return res.json({
                errors: [{
                    type: Strings.INTERNAL_SERVER_ERROR,
                    msg: 'Error sending Invoice mail. Please try again later.'
                }]
            });
        return res.json({
            msg: 'An email has been sent with the info of your payment.'
        })

    });
}
