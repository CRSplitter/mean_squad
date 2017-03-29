var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    totalPrice: Number,
    details: String,
    countParticipants: Number,
    confirmed: Boolean,
    time: Date,
    expirationInHours: Number,
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    activityId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    }
});


mongoose.model('Reservation', reservationSchema);