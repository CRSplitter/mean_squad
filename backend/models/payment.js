var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    amount: Number,
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
        unique: "true"
    }
});


var Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;