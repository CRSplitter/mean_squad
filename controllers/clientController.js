var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');

/*
    Ensures user is logged in
    @mekladious
*/

module.exports.ensureAuthenticated = [

    function(req, res, next){
        if(req.isAuthenticated())
            return next();
        else
            return res.json({message:"You have to login first"})
    }

];


/*
    Creates a new Reservation instance and returns success/failure message
    @params details, countParticipants, time, expirationInHours, clientId, activityId
    @return json
    @mira
*/

module.exports.makeReservation = [

    // Passing the activity in the body
    function(req, res, next) {

        Activity.findById(activityId, function(err, Activity) {
            if (err) return res.json({ error: "Error" });
            req.body.activity = Activity;
            next();
        });
    },

    // Checking if the age of the client is suitable for this activity age<minage
    function(req, res, next) {
        var curr = new Date();
        var age = Math.floor((curr - req.body.dateOfBirth.getFullYear()) / 31557600000); //Dividing by 1000*60*60*24*365.25
        if (age < req.body.activity.minAge)
            return res.json({ message: 'You are too young to reserve this activity' })
        next();
    },

    // Check if number of participants is within the range
    function(req, res, next) {
        if (req.body.countParticipants < req.body.activity.minParticipants) {
            return res.json({ message: 'Participants are less than the minimum required for this activity' });
        }
        if (req.body.countParticipants > req.body.activity.maxParticipants) {
            return res.json({ message: 'Participants are more than the maximum capacity for this activity' });
        }
        next();
    },

    // Calculating the total price and adding the reservation to the database
    function(req, res, next) {
        var total = req.body.countParticipants * req.body.activity.price;
        var newReservation = new Reservation({
            totalPrice: total,
            details: req.body.details,
            countParticipants: countParticipants,
            confirmed: false,
            time: req.body.time,
            expirationInHours: req.body.expirationInHours,
            clientId: req.body.clientId,
            activityId: req.body.activityId
        });

        Reservation.create(newReservation, function(err, Reservation) {
            if (err) console.log(err);
            console.log(Reservation);
            return res.json({ message: 'Reservation has been made successfully' });
        });

    }
];


/*
    @param clientId
    @return array of reservations
    @mira
 */

module.exports.viewReservations = [

    function(req, res, next) {
        var clientId = req.body.clientId;
        Reservation.find({ clientId: clientId }, function(err, results) {
            if (err) return res.json({ error: "Error" });
            return res.json({ message: "Success", reservations: results });
        });
    }

];


/*
    Removes a certain reservation
    @param reservationId
    @mira
*/

module.exports.cancelReservation = [

    function(req, res, next) {
        var reservationId = req.body.reservationId;
        Reservation.remove({ _id: reservationId }, function(err, res) {
            if (err) return res.json({ error: err });
            res.json({ message: "Reservation has been cancelled successfully" });
        });
    }

];