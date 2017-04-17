var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientRateActivitySchema = mongoose.Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        "enum": [0, 1, 2, 3, 4]
    }
});

clientRateActivitySchema.index({
    clientId: 1,
    activityId: 1
}, {
    unique: true
});

var ClientRateActivity = mongoose.model('ClientRateActivity', clientRateActivitySchema);
module.exports = ClientRateActivity;