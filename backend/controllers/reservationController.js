
var mongoose = require('mongoose');
var Day = mongoose.model('Day');


/**
 * check if the requested participants fit in the chosen slot
 */
module.exports.checkAvailable = function(req, res, next) {
    var dayId = req.body.dayId;
    var slotId = req.body.slotId;
    Day.findById(dayId, function (err, day) {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: "Cannot find slot"
                }]
            });
        }
        day.slots.forEach(function (slot) {
            if (slot._id == slotId) {
                if (parseInt(slot.currentParticipants) + parseInt(req.body.countParticipants) > parseInt(slot.maxParticipants)) {
                    return res.json({
                        errors: [{
                            type: strings.MAX_PARTICIPANTS,
                            msg: "Number of participants in slot exceeded"
                        }]
                    });
                }
                req.body.time = slot.time;
                req.body.dayString = day.day;
                next();
            }
        });
    });
}