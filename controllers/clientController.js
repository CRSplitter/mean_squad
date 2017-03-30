var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');

/*
    Creates a new Reservation instance
    @params details, countParticipants, time, expirationInHours, clientId, activityId
    @mira
*/
module.exports.makeReservation =[
    
    function(req,res,next){

        Activity.findById(activityId, function(err, Activity){
            if(err) return err;
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
            req.flash('success_msg', 'Reservation has been made successfully');
        });

    }
]