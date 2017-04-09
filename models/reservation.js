/**
 *  @mixin Reservation
 *  @property {String} email User's email
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    totalPrice: Number,
    details: String,
    countParticipants: Number,
    confirmed: String,
    time: Date,
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    }
});


var Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;