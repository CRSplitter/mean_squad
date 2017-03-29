var mongoose= require('mongoose');
var Schema = mongoose.Schema; 

var activitySchema = new Schema({
    id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'      
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
module.exports("Activity", activitySchema);