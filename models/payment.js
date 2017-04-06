var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    transactionId: String,
    amount: Number,
    details: String,
    paymentType: String,
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
        unique: "true"
    }
});


var Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;