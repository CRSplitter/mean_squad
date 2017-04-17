
var mongoose = require('mongoose');
var Day = mongoose.model('Day');
var Activity = mongoose.model('Activity');
var Reservation = mongoose.model('Reservation');
var strings = require('./helpers/strings');
var helperFunctions = require('./helpers/functions');


/**
 * check if the requested participants fit in the chosen slot
 * @ameniawy
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

/**
 * Sets the date to be inserted into the reservation
 * @ameniawy
 */
module.exports.setReservationDate = function(req, res, next) {
    var day = helperFunctions.getDayNumber(req.body.dayString);
    var date = new Date();
    date.setDate(date.getDate() + (day + 7 - date.getDay()) % 7);
    date.setHours(req.body.time.split(":")[0]);
    date.setMinutes(req.body.time.split(":")[1]);
    date.setSeconds(0);
    date.setMilliseconds(0);
    req.body.date = date;
    next();
}


/**
 * Check that the min and max number of participants is not violated
 * @ameniawy
 */
module.exports.checkMinMax = function(req, res, next) {
    if (req.body.countParticipants <= req.body.activity.minParticipants) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: 'Participants are less than the minimum required for this activity'
            }]
        });
    }
    if (req.body.countParticipants >= req.body.activity.maxParticipants) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: 'Participants are more than the maximum capacity for this activity'
            }]
        });
    }
    next();
}


/**
 * Checks that the min age is not violated for this activity
 * @ameniawy
 */
module.exports.checkAge = function(req, res, next) {
    var curr = new Date();
    var age = Math.floor((curr - req.body.client.dateOfBirth) / 31557600000); //Dividing by 1000*60*60*24*365.25
    if (age < req.body.activity.minAge) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: 'You are too young to reserve this activity'
            }]
        });
    }
    next();
}


/**
 * Checks if the reservation was already made with the same exact attributes.
 * @ameniawy
 */
module.exports.duplicateReservation = function(req, res, next) {
    var details = req.body.details;
    var countParticipants = req.body.countParticipants;

    req.checkBody('countParticipants', 'Number of participants is required').notEmpty();
    req.checkBody('details', 'Details are required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.json({
            errors: errors
        });
    }

    var total = countParticipants * req.body.activity.price;
    var query = {
        totalPrice: total,
        details: details,
        countParticipants: countParticipants,
        confirmed: strings.RESERVATION_STATUS_PENDING,
        date: req.body.date,
        expirationInHours: req.body.activity.expirationInHours,
        activityId: req.body.activityId,
        slotId: req.body.slotId,
        dayId: req.body.dayId
    }
    
    if(req.body.cleint) {
        query.clientId = req.body.client._id;
    }
    req.body.newReservation = new Reservation(query);

    Reservation.find(query, function (err, Reservations) {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            });
        }
        if (Reservations.length > 0) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: 'You have already made this reservation'
                }]
            });
        }
        next();
    });
}


/**
 * Updates the currentParticipants of the chosen slot
 */
module.exports.updateSlot = function(req, res, next) {
    Day.update({
            _id: req.body.dayId,
            "slots._id": req.body.slotId
        }, {
            $inc: {
                "slots.$.currentParticipants": req.body.countParticipants
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        },
        function (err, day) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }
            next();
        });
}


/**
 * Creates reservation with the passed parameters.
 * @ameniawy
 */
module.exports.createReservation = function(req, res, next) {
    Reservation.create(req.body.newReservation, function (err) {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            });
        }
        return res.json({
            msg: 'Reservation has been made successfully'
        });
    })
}


/**
 * Finds activity requested for this reservation
 * @ameniawy
 */
module.exports.findActivity = function(req, res, next) {
    var activityId = req.body.activityId;
    Activity.findById(activityId, function (err, Activity) {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: "Cannot find activity"
                }]
            });
        }
        if (!Activity) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Activity not found"
                }]
            });
        }
        req.body.activity = Activity;
        next();
    });    
}

/**
 * Finds activity requested for this reservation
 * @mohab
 */
module.exports.getReservation = function(req, res) {
    var reservationId = req.params.id;

    Reservation.findById(reservationId).populate({path: 'activityId',
        populate: {path: "businessId", 
        populate: {path: "userId",
        populate: {path: "clientId"}}}})
    .exec(function (err, reservation) {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: "Cannot find reservation"
                }]
            });
        }
        if (!reservation) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Reservation not found"
                }]
            });
        }
        res.json({
            msg: "success",
            data: reservation
        });
    });    
}