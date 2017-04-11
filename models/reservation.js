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
    expirationInHours: Number,
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    }
});

// reservationSchema.index({
//     "totalPrice": 1,
//     "details": 1,
//     "countParticipants": 1,
//     "confirmed": 1,
//     "time": 1,
//     "expirationInHours": 1,
//     "clientId": 1,
//     "activityId": 1
// }, {
//     unique: true,
//     validate: "You have already made this reservation"
// });

var Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;