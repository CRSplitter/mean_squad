var mongoose = require('mongoose'),
    Reservation = mongoose.model('Reservation');
    Activity = mongoose.model('Activity');
    User = mongoose.model('User');
    BusinessOperator = mongoose.model('BuisnessOperator');
    Business = mongoose.model('Business');
    Payment = mongoose.model('Payment');
    Promotion = mongoose.model('Promotion');

    var ObjectId = require('mongoose').Schema.ObjectId




module.exports.viewReservations = 
function(req,res) {
    //fillDatabase()
    var bussinessId = "58dc3692925b5d34ff096981" 
    Business.findById(bussinessId,function(error,bussiness){
        if(error){
                res.send(JSON.stringify(error)); 
            }
        Activity.find({businessId:bussiness._id}, function(error,activities){
            if(error){
                res.send(JSON.stringify(error)); 
            }
            viewReservationsHelper(error,activities,res)
        })
    })
}


function viewReservationsHelper(error,activities,res){    
    if(error){
        res.send(JSON.stringify(error));
    }
    else{
        var activitiesId = returnIdsOnly(activities)
        Reservation.find(function(error, reservations){
            if(error){
                res.send(JSON.stringify(error)); 
            }
            var resertionsBelongToOperator = filterEntityByActivity(reservations,activitiesId)
            res.send(JSON.stringify(resertionsBelongToOperator)); 
        })
    }
}

function filterEntityByActivity(entity,activitiesId){
    var entityBelongToOperator = Array()
    for (i = 0; i < entity.length; i++) { 
        var entityActivityId = entity[i].activityId
        if(activitiesId.indexOf(String(entityActivityId))>=0){
            entityBelongToOperator.push(entity[i])
        }
    }

    return entityBelongToOperator
}


function returnIdsOnly(modelArray){
    var ids = Array()
    for (i = 0; i < modelArray.length; i++) { 
        ids.push(String(modelArray[i]._id))
    }
    return ids
}

module.exports.viewActivities = 
function(req,res){
    var bussinessId = "58dc3692925b5d34ff096981" 
    Business.findById(bussinessId,function(error,bussiness){
        Activity.find({businessId:bussiness._id}, function(error,activities){
            if(error){
                res.send(JSON.stringify(error)); 
            }else{
                res.send(JSON.stringify(activities)); 
            }
        })
    })
}


module.exports.viewPayments = 
function(req,res) {
    //fillDatabase()
    var bussinessId = "58dc326f0ac711314c1567d0" 
    Business.findById(bussinessId,function(error,bussiness){
        if(error){
                res.send(JSON.stringify(error)); 
            }
        Activity.find({businessId:bussiness._id}, function(error,activities){
            if(error){
                res.send(JSON.stringify(error)); 
            }
            viewPaymentssHelper(error,activities,res)
        })
    })
}


function viewPaymentssHelper(error,activities,res){    
    if(error){
        res.send(JSON.stringify(error));
    }else{
        var activitiesId = returnIdsOnly(activities)
        Reservation.find(function(error, reservations){
            if(error){
                res.send(JSON.stringify(error)); 
            }
            var resertionsBelongToOperator = filterEntityByActivity(reservations,activitiesId)
            Payment.find(function(error,payments){
                if(error){
                    res.send(JSON.stringify(error)); 
                }else{
                    var reservationsId = returnIdsOnly(resertionsBelongToOperator)
                    var paymentsBelongToOperator = filterPaymentByResrvetions(payments,reservationsId)
                    res.send(JSON.stringify(paymentsBelongToOperator)); 
                }      
            })
        })
    }
}


function filterPaymentByResrvetions(payments,reservationsId){
    var paymentsBelongToOperator = Array()
    for (i = 0; i < payments.length; i++) { 
        var paymentReservationId = payments[i].reservationId
        if(reservationsId.indexOf(String(paymentReservationId))>=0){
            paymentsBelongToOperator.push(payments[i])           
        }
    }
    return paymentsBelongToOperator
}



module.exports.viewPromotions = 
function(req,res) {
    //fillDatabase()
    var bussinessId = "58dc3692925b5d34ff096981" 
    Business.findById(bussinessId,function(error,bussiness){
        if(error){
                res.send(JSON.stringify(error)); 
            }
        Activity.find({businessId:bussiness._id}, function(error,activities){
            if(error){
                res.send(JSON.stringify(error)); 
            }
            viewPromotionHelper(error,activities,res)
        })
    })
}


function viewPromotionHelper(error,activities,res){  
    if(error){
        res.send(JSON.stringify(error));
    }
    else{
        var activitiesId = returnIdsOnly(activities)
        Promotion.find(function(error, promotions){
            if(error){
                res.send(JSON.stringify(error)); 
            }
            var promotionsBelongToOperator = filterEntityByActivity(promotions,activitiesId)
            res.send(JSON.stringify(promotionsBelongToOperator)); 
        })
    }
}


module.exports.createReservation = 
function(req,res) {
    //fillDatabase()
    Reservation.create(req.body,function(error,reservation){
        if(error){
            res.send(JSON.stringify(error)); 
        }
        res.send(JSON.stringify(reservation)); 
    })


}













function fillDatabase(){
    // var user = User();
    // user.username = "ThemePark"
    // user.email = "aa@h.ThemePark"
    // user.password = "12345"
    // user.name = "ThemePark"
    // User.create(user,function(error,user){
    //     if(error){
    //         console.log(error)
    //     }else{
    //     var business = Business()
    //     business.name = "ThemePark"
    //     business.userId = user._id
    //     Business.create(business,function(error,business){
    //         if(error){
    //             console.log(error)
    //         }else{  
    //                 var activity = Activity()
    //                 activity.name = "Activity3"
    //                 activity.businessId = business._id
    //                 Activity.create(activity,function(error,activity){
    //                     var reservation = Reservation()
    //                     reservation.totalPrice = 11
    //                     reservation.details = "Detail5"
    //                     reservation.activityId = activity._id
    //                     Reservation.create(reservation) 
    //                 })   

                
    //         }
            
    //     })
    //     }
        

    // }) 


    var promotion = Promotion()
                        promotion.details = "promotions2"
                        promotion.activityId = "58dc3692925b5d34ff096982"
                        Promotion.create(promotion)   

}
