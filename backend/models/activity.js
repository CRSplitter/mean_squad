/**
 *  @mixin Activity
 *  @property {String} name Activity title
 *  @property {String} description Activity description
 *  @property {Number} price Activity price
 *  @property {Number} maxParticipants Activity max participants
 *  @property {Number} minParticipants Activity min participants
 *  @property {Number} minAge Activity min age
 *  @property {Number} durationHours Activity duaration in hours
 *  @property {Number} durationMinutes Activity duration in minutes
 *  @property {Number} avgRating Activity average rating
 *  @property {String} image Activity image
 *  @property {String} activityType Activity type
 *  @property {Day} activitySlots Activity available slots
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
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
    image: String,
    activityType: String,
    activitySlots: [{
        type: Schema.Types.ObjectId,
        ref: 'Day'
    }]
});

var Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;


module.exports.getActivityById = (activityId, callback) => {
    Activity.findById(activityId, callback);
}


module.exports.getActivityByBusinessId = (businessObjId, callback) => {
    Activity.find({
        businessId: businessObjId
    }, callback);
}


module.exports.createActivity = (newActivity, callback) => {
    Activity.create(newActivity, callback);
}

module.exports.updateActivity = (activityObjId, editedActivity, callback) => {
    Activity.findOneAndUpdate({
        _id: activityObjId
    }, editedActivity, {
        upsert: false,
        new: true
    }, callback);
}

module.exports.deleteActivity = (activityObjId, callback) => {
    Activity.findOneAndRemove({
        _id: activityObjId
    }, callback);
}
