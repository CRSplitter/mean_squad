var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var userController = require('./userController');
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');

/**
 * Update Client's info 
 * @param: dateOfBirth : Date
 * @param: name : String
 * @param: email : String
 * @return: json {error} or {message, user}
 * @IOElgohary
 */

module.exports.update = [
    function (req, res, next) {

        /*var newClient = {
            dateOfBirth: "11-2-1980",
            userId: req.user._id
        };

        Client.create(newClient, () => {*/

        // Validation
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('name', 'name is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }


        var query = {
            // find query
            userId: req.user._id
        };

        var newData = {
            // Update
            dateOfBirth: req.body.dateOfBirth
        }

        Client.update(query, newData, (err, updated) => {
            if (err) {
                return res.json({
                    error: err.message
                });
            }
            next();
        });
        // });
    },
    userController.update
]


/**
 * register new client 
 * @param: dateOfBirth : Date
 * @return: json {error} or {message, user}
 * @ameniawy
 */
module.exports.register = [
    function(req, res, next) {
        var user = req.body.newUser;
        Client.create({
            userId: user._id,
            dateOfBirth: req.body.dateOfBirth
        }, function(err, client) {
            if(err) {
                res.status(500).json({
                    status:'failed',
                    message: 'Internal server error'
                });      
            }
            
            res.status(200).json({
                status: 'succeeded',
                message: 'Client was successfully created'
            });

        });
        
    }
];


/**
 * Gets the client from the userId
 * @param clientId
 * @return json
 * @mira
 */

module.exports.getClient = [

    function(req, res, next) {
        console.log(req.user);
        Client.findOne({ userId: req.user._id }, function(err, client) {
            if (err) return res.json({ error: "Error" });
            req.body.client = client;
            return next();
        })
    }

];


/**
 * Creates a new Reservation instance and returns success/failure message
 * @param details, countParticipants, time, expirationInHours, clientId, activityId
 * @return json
 * @mira
 */

module.exports.makeReservation = [

    // Passing the activity in the body
    function(req, res, next) {
        var activityId = req.body.activityId;
        Activity.findById(activityId, function(err, Activity) {
            if (err) return res.json({ error: "Error" });
            req.body.activity = Activity;
            next();
        });
    },

    // Checking if the age of the client is suitable for this activity age<minage
    function(req, res, next) {
        var curr = new Date();
        var age = Math.floor((curr - req.body.client.dateOfBirth) / 31557600000); //Dividing by 1000*60*60*24*365.25
        if (age < req.body.activity.minAge)
            return res.json({ message: 'You are too young to reserve this activity' });
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

        var details = req.body.details;
        var countParticipants = req.body.countParticipants;
        var time = req.body.time;
        var expirationInHours = req.body.expirationInHours;;

        req.checkBody('countParticipants', 'Number of participants is required').notEmpty();
        req.checkBody('time', 'Time is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            console.log(errors);
            res.json({ errors: errors });
        }

        var total = countParticipants * req.body.activity.price;
        var newReservation = new Reservation({
            totalPrice: total,
            details: details,
            countParticipants: countParticipants,
            confirmed: false,
            time: time,
            expirationInHours: expirationInHours,
            clientId: req.body.client._id,
            activityId: req.body.activityId
        });

        Reservation.create(newReservation, function(err, Reservation) {
            if (err) console.log(err);
            console.log(Reservation);
            return res.json({ message: 'Reservation has been made successfully' });
        });

    }
];


/**
 * Gets all reservations of a client
 * @param clientId
 * @return array of reservations
 * @mira
 */

module.exports.viewReservations = [

    function(req, res, next) {
        var clientId = req.body.client._id;
        Reservation.find({ clientId: clientId }, function(err, results) {
            if (err) return res.json({ error: "Error" });
            return res.json({ message: "Success", reservations: results });
        });
    }

];


/**
 * Removes a certain reservation
 * @param reservationId
 * @mira
 */

module.exports.cancelReservation = [

    function(req, res, next) {
        var reservationId = req.body.reservationId;
        var clientId = req.body.client._id;
        Reservation.remove({ _id: reservationId, clientId: clientId }, function(err) {
            if (err) return res.json({ error: "error" });
            return res.json({ message: "Reservation has been cancelled successfully" });
        });
    }

];