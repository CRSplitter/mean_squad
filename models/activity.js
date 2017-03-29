var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buisness'
    },
    name: String,
    description: String,
    price: Number,
    maxParticipants: Number,
    minParticipants: Number,
    minAge: Number,
    durationHours: Number,
    durationMinutes: Number,
    avgRating: Number,
    images: [String],
    activityType: String
})

var Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity