var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');


/*
    Creates a new Reservation instance and returns success/failure message
    @params details, countParticipants, time, expirationInHours, clientId, activityId
    @return json
    @mira
*/

module.exports.makeReservation =[
    
    function(req,res,next){

        Activity.findById(activityId, function(err, Activity){
            if(err) return res.json({error:"Error"});
            req.body.activity = Activity;
            next();
        });
    },

    function(req,res,next){
        if(req.body.countParticipants < req.body.activity.minParticipants){
            return res.json({message: 'Participants are less than the minimum required for this activity'});
        } 
        if(req.body.countParticipants > req.body.activity.maxParticipants){
            return res.json({message: 'Participants are more than the maximum capacity for this activity'});
        } 
        next();
    },

    function(req,res,next){
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
        
        Reservation.create(newReservation, function(err, Reservation){
            if(err) console.log(err);
            console.log(Reservation);
            return res.json({message: 'Reservation has been made successfully'});
        });

    }
];


/*
    @param clientId
    @return array of reservations
    @mira
 */

module.exports.viewReservations = [

    function(req,res,next){
        var clientId = req.body.clientId;
        Reservation.find({clientId:clientId}, function(err, results){
            if(err) return res.json({error: "Error"});
            return res.json({message:"Success", results});
        });
    }

];


/*
    Removes a certain reservation
    @param reservationId
    @mira
*/

module.exports.cancelReservation = [

    function(req,res,next){
        var reservationId = req.body.reservationId;
        Reservation.remove({_id: reservationId}, function(err, res){
            if(err) return res.json({error: err});
            res.json({message: "Reservation has been cancelled successfully"});
        });
    }

];