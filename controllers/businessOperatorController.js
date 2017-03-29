var mongoose = require('mongoose'),
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');

module.exports.viewReservations = 
function(req,res) {
    var bussinessOperator = req.user    
    if (bussinessOperator.type == "BuisnessOperator") {
        var business = bussinessOperator.businessId
        Activity.find({activitySchema},viewReservationsHelper)
    }
}


function viewReservationsHelper(error,activities){
    if(error){
        res.send(JSON.stringify(error));
    }else{
        var activitiesId = returnIdsOnly(activities)
        Reservation.find(function(error, reservations){
            var resertionsBelongToOperator = Array()
            for (i = 0; i < reservations.length; i++) { 
                var reservationsActivityId = reservations[i].activityId
                if(containsObject(reservationsActivityId,activitiesId)){
                    resertionsBelongToOperator.push(reservations[i])
                }
            }
            res.send(JSON.stringify(activitiesId)); 
        })
    }
}

function returnIdsOnly(modelArray){
    var ids = Array()
    for (i = 0; i < modelArray.length; i++) { 
        ids.push(modelArray[i]._id)
    }
    return ids
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}


