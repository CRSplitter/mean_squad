/**
 *  @mixin Day
 *  @property {String} day day name
 *  @property {Array} slots {time: String, maxParticipants:Number, currentParticipants:Number} slot slot object
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var daySchema = new Schema({
    day: String,
    slots: [{
        time: String,
        maxParticipants: Number,
        currentParticipants: {
            type: Number,
            default: 0
        }
    }]
});

var Day = mongoose.model('Day', daySchema);
