/**
 *  @mixin Reservation
 *  @property {Number} totalPrice Reservation total price
 *  @property {Number} countParticipants Number of participants
 *  @property {Number} expirationInHours Number of hours before the reservation expires
 *  @property {String} details Reservation details and comments
 *  @property {String} confirmed Reservation status if confirmed or not
 *  @property {Date} date Reservation date
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    totalPrice: Number,
    details: String,
    countParticipants: Number,
    confirmed: String,
    date: Date,
    expirationInHours: Number,
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    },
    dayId: {
        type: Schema.Types.ObjectId,
        ref: 'Day'
    },
    slotId: String
});


var Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
