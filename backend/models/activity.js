/**
 *  @mixin Activity
 *  @property {String} name Activity title
 *  @property {String} description Activity title
 *  @property {Number} price Activity title
 *  @property {Number} maxParticipants Activity title
 *  @property {Number} minParticipants Activity title
 *  @property {Number} minAge Activity title
 *  @property {Number} durationHours Activity title
 *  @property {Number} durationMinutes Activity title
 *  @property {Number} avgRating Activity title
 *  @property {String} images Activity title
 *  @property {String} activityType Activity title
 *  @property {[Day]} activitySlots Activity title
 */


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
