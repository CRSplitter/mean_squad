var mongoose = require('mongoose');
var Day = mongoose.model('Day');
var strings = require('./strings');


/**
 * gets the day as a string and returns the equivelant int
 * @param {String} daysString: string of weekdays
 * @return {Number}
 * @author ameniawy
 */
module.exports.getDayNumber = function (dayString) {
    var map = new Map();
    map.set("sunday", 0);
    map.set("monday", 1);
    map.set("tuesday", 2);
    map.set("wednesday", 3);
    map.set("thursday", 4);
    map.set("friday", 5);
    map.set("saturday", 6);
    return map.get(dayString.toLowerCase());
}


/**
 * resets all slots belonging do the ending day of the week
 * @author ameniawy
 */
module.exports.resetSlots = function () {
    var date = new Date();
    var n = date.getDay() - 1; // reset previous day

    Day.find({
        day: strings.WEEK_DAY[n]
    }, function(err, days) {
        for(i = 0; i < days.length; i++) {
            for(j = 0; j < days[i].slots.length; j++) {
                days[i].slots[j].currentParticipants = 0;
            }
            days[i].save();
        }
    });

}