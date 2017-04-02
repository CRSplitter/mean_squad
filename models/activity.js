var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    businessId: {
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
module.exports = Activity;

/* CRUD */
model.exports.getActivityById = (activityId, callback)=>{
    Activity.findById(activityId , callback);
}


model.exports.getActivityByBusinessId = (businessObjId, callback)=>{
    Activity.find({businessId: businessObjId }, callback);
}


model.exports.createActivity = (newActivity, callback) => {
    newActivity.save(callback);
}

model.exports.updateActivity = (activityObjId, editedActivity, callback) => {
    Activity.findOneAndUpdate({_id: activityObjId}, editedActivity ,{upsert: false, new: true} ,callback);
}


model.exports.deleteActivity = (activityObjId, callback) => {
    Activity.findOneAndRemove({_id: activityObjId}, callback);
}