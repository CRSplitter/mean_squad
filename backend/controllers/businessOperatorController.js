/**
 * @module Business Operator Controller
 * @description The controller that is responsible of handling admin's requests
 * @fawzy, khattab
 */
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;
var User = mongoose.model('User');
var Business = mongoose.model('Business');
var BusinessOperator = mongoose.model('BusinessOperator');
var UserController = require('./userController');
var reservationController = require('./reservationController');
var Payment = mongoose.model('Payment');
var Promotion = mongoose.model('Promotion');
var Activity = mongoose.model('Activity');
var Reservation = mongoose.model('Reservation');
var Day = mongoose.model('Day');
var strings = require('./helpers/strings');

/*
4.2
This fucntion returns all the reservations that is related to the business operator
@return json {errors: [error]} or [{reservationObject}]
@fawzy
 */
module.exports.viewReservations =
    function(req, res) {
        userAuthChecker(req, res, function(businessId) {
            Business.findById(businessId, function(error, business) {
                if (error) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'Error inserting in Business'
                        }]
                    });
                }
                Activity.find({ businessId: business._id }, function(error, activities) {
                    if (error) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: 'Error finding an Activity'
                            }]
                        });
                    }
                    viewReservationsHelper(error, activities, res);
                })
            })

        })
    }


/*
4.3
This fucntion returns all the Activities that is related to the business operator
@return json {errors: [error]} or [{ActivityObject}]
@fawzy
 */
module.exports.viewActivities =
    function(req, res) {
        userAuthChecker(req, res, function(businessId) {
            Business.findById(businessId, function(error, business) {
                if (error) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'Error finding a Business'
                        }]
                    });
                }
                Activity.find({ businessId: business._id }, function(error, activities) {
                    if (error) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: 'Error finding an Activity'
                            }]
                        });
                    }
                    // Success
                    res.json({
                        msg: 'Activities retirieved successfully',
                        data: { activities: activities }
                    });
                })
            })

        })
    }


/*
4.4
This fucntion returns all the Payments that is related to the business operator's business
@return json {errors: [error]} or [{PaymentObject}]
@fawzy
 */
module.exports.viewPayments =
    function(req, res) {
        userAuthChecker(req, res, function(businessId) {
            Business.findById(businessId, function(error, business) {
                if (error) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'Error finding a Business'
                        }]
                    });
                }
                Activity.find({ businessId: business._id }, function(error, activities) {
                    if (error) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: 'Error finding an Activity'
                            }]
                        });
                    }
                    viewPaymentsHelper(error, activities, res);
                })
            })

        })

    }


/*
4.5
This fucntion returns all the Promotions that is related to the business operator's business
@return json {errors: [error]} or [{Promotion}]
@fawzy
 */
module.exports.viewPromotions =
    function(req, res) {
        userAuthChecker(req, res, function(businessId) {
            Business.findById(businessId, function(error, business) {
                if (error) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'Error finding a Business'
                        }]
                    });
                }
                Activity.find({ businessId: business._id }, function(error, activities) {
                    if (error) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: 'Error finding an Activity'
                            }]
                        });
                    }
                    viewPromotionHelper(error, activities, res);
                })
            })

        })
    }


/*
4.6
This fucntion creates a reservation on behalf of the user
@params its takes a form that contains all fields of Reservation Object
@return json {errors: [error]} or {ReservationObjectCreated}
@fawzy, ameniawy
 */
module.exports.makeReservation = [
    // Passing the activity in the body
    reservationController.findActivity,
    // Check if number of participants is within the range
    reservationController.checkMinMax,
    // Check if number of requested participants remaining for requested timing 
    reservationController.checkAvailable,
    // get date
    reservationController.setReservationDate,
    // Checking for a duplicate entry and validation
    reservationController.duplicateReservation,
    // update the number of currentParticipants
    reservationController.updateSlot,
    // create the reservation
    reservationController.createReservation
]


/*
This fucntion get the the reservation belonging to the list of activities
@params error,activities,res
@return json {errors: [error]} or [{ReservationObject}]
@fawzy
 */
function viewReservationsHelper(error, activities, res) {
    if (error) {
        return res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: 'Error finding Reservations'
            }]
        });
    } else {
        var activitiesId = returnIdsOnly(activities);
        Reservation.find(function(error, reservations) {
            if (error) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error finding a Reservation'
                    }]
                });
            }
            var operatorReservations = filterEntityByActivity(reservations, activitiesId);
            res.json({
                msg: 'Activities retirieved successfully',
                data: { reservations: operatorReservations }
            });
        })
    }
}


/*
This fucntion joins any model with the model activity and returns the list values of
the other model after joining
@params entity -Which is the model values- , activitiesId - List of activities Ids -
@return [modelObject]
@fawzy
 */
function filterEntityByActivity(entity, activitiesId) {
    var entityBelongToOperator = Array();
    for (i = 0; i < entity.length; i++) {
        var entityActivityId = entity[i].activityId;
        if (activitiesId.indexOf(String(entityActivityId)) >= 0) {
            entityBelongToOperator.push(entity[i]);
        }
    }

    return entityBelongToOperator;
}


/*
This fucntion takes a list of objects and returns it coresponding list of ids
@params modelArray
@return [idOfObject]
@fawzy
 */
function returnIdsOnly(modelArray) {
    var ids = Array();
    for (i = 0; i < modelArray.length; i++) {
        ids.push(String(modelArray[i]._id));
    }
    return ids;
}


/*
This fucntion is helper for the viewPayment function and returns payment belonging to
list of activities
@params error,activities,res
@return json {errors: [error]} or [{paymentObject}]
@fawzy
 */
function viewPaymentsHelper(error, activities, res) {
    if (error) {
        return res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: 'Error viewing Payments'
            }]
        });
    } else {
        var activitiesId = returnIdsOnly(activities);
        Reservation.find(function(error, reservations) {
            if (error) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error finding a Reservation'
                    }]
                });
            }
            var resertionsBelongToOperator = filterEntityByActivity(reservations, activitiesId);
            Payment.find(function(error, payments) {
                if (error) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'Error finding a Payment'
                        }]
                    });
                } else {
                    var reservationsId = returnIdsOnly(resertionsBelongToOperator);
                    var paymentsBelongToOperator = filterPaymentByResrvetions(payments, reservationsId);
                    res.json({
                        msg: 'Activities retirieved successfully',
                        data: { payments: paymentsBelongToOperator }
                    });
                }
            })
        })
    }
}


/*
 * 5.9: As a business, I can add operator to my business (to make reservation on behalf of clients).
 * @khattab
 */
module.exports.addType = function(req, res, next) {
    req.body.userType = strings.BUSINESS_OPERATOR;
    next();
}


/*
This function joins the payments with the reservation by the ids and returns list of payment object
@params error,activities,res
@return json {errors: [error]} or [{paymentObject}]
@fawzy
 */
function filterPaymentByResrvetions(payments, reservationsId) {
    var paymentsBelongToOperator = Array();
    for (i = 0; i < payments.length; i++) {
        var paymentReservationId = payments[i].reservationId;
        if (reservationsId.indexOf(String(paymentReservationId)) >= 0) {
            paymentsBelongToOperator.push(payments[i]);
        }
    }
    return paymentsBelongToOperator;
}


/*
This fucntion is helper for the viewPromotions function and returns promotions belonging to
list of activities
@params error,activities,res
@return json {errors: [error]} or [{promotionObject}]
@fawzy
 */
function viewPromotionHelper(error, activities, res) {
    if (error) {
        return res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: 'Error finding a Promotion'
            }]
        });
    } else {
        var activitiesId = returnIdsOnly(activities);
        Promotion.find(function(error, promotions) {
            if (error) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error finding Promotions'
                    }]
                });
            }
            var promotionsBelongToOperator = filterEntityByActivity(promotions, activitiesId);
            res.json({
                msg: 'Promotions retirieved successfully',
                data: { promotions: promotionsBelongToOperator }
            });
        })
    }
}


/*
This fucntion checks if user the Autherized as a BuisnessOperator and then preforms a callback function
@params req,res,callBack
@return json {errors: [error]} or void
@fawzy
*/
function userAuthChecker(req, res, callBack) {
    var user = req.user;
    if (user != undefined) {
        if (user.userType == strings.BUSINESS_OPERATOR) {
            BusinessOperator.findOne({ userId: user._id }, function(error, businessOperator) {
                if (error) {
                    res.send(JSON.stringify(error));
                }
                if (businessOperator != undefined) {
                    var bussinessId = businessOperator.businessId;
                    callBack(bussinessId);
                } else {
                    res.send(JSON.stringify({ "error": "business Operator haven't been creaetd yet" }));
                }
            })
        } else {
            res.send(JSON.stringify({ "error": "Unauthorized to access please login as businessOperator" }));
        }
    } else {
        res.send(JSON.stringify({ "error": "Unauthorized to access please login" }));
    }
}


/*
 * A function responsible for creating a new business operator
 * this gets called from the User.register
 * @khattab
 */
module.exports.create = function(req, res, next) {
    Business.findOne({ userId: req.user._id }).then(function(business) {
        BusinessOperator.create({ userId: req.body.newUser._id, businessId: business._id }).then(function() {
            res.json({
                msg: 'Business operator created successfully'
            });
            next();
        }).catch(function(err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error creating a Business Operator'
                }]
            });
        });
    }).catch(function(err) {
        return res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: 'Internal server error'
            }]
        });
    });
};


/*
  Edits a reservation by an operator.
  @param operator credentials, reservation details : operatorId, reservationId,
  totalPrice, details, countParticipants, confirmed, time
  @return json {message: string, error: string}
  checks for persmission of the operator,
  if so; updates the reservation.
  @mohab
*/
module.exports.editReservation = [

    function(req, res, next) {
        BusinessOperator.findOne({ userId: req.user.id }, function(err, operator) {
            if (err || operator == null) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Operator not found'
                    }]
                });
            } else {
                req.operator = operator;
                next();
            }
        });
    },
    function(req, res, next) {
        var reservationId = req.body.reservationId;
        Reservation.findById(reservationId, function(err, reservation) {
            if (err || reservation == null) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Reservation not found'
                    }]
                });
            } else {
                req.reservation = reservation;
                next();
            }
        });
    },
    function(req, res, next) {
        var activityId = req.reservation.activityId;
        Activity.findById(activityId, function(err, activity) {
            if (err || activity == null) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Activity not found'
                    }]
                });
            } else {
                req.activity = activity;
                next();
            }
        });
    },
    function(req, res, next) {
        var operator = req.operator;
        var reservation = req.reservation;
        var activity = req.activity;
        // if the new price/details is null, undefined or 0; it won't change
        var details = req.body.details || reservation.details;
        // these must be passed
        var countParticipants = req.body.countParticipants;
        var totalPrice = parseInt(countParticipants) * parseInt(activity.price);
        // has to be boolean!
        var confirmed = req.body.confirmed;
        var time = req.body.time;
        if (operator.businessId.equals(activity.businessId)) {
            Reservation.update({ _id: reservation.id }, {
                $set: {
                    totalPrice: totalPrice,
                    details: details,
                    countParticipants: countParticipants,
                    confirmed: confirmed,
                    time: time
                }
            }, function(err, updateRes) {
                if (err || updateRes.nModified == "0") {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'The reservation wasn\'t updated!'
                        }]
                    });
                } else {
                    res.json({
                        msg: 'The reservation was updated successfully'
                    });
                }
            });
        } else {
            res.json({
                errors: [{
                    type: strings.ACCESS_DENIED,
                    msg: 'You don\'t belong to the business owing this activity'
                }]
            });
        }
    },
];


/*
  Cancels a reservation by an operator.
  @param operator credentials, reservation details : operatorId, reservationId
  @return json {message: string, error: string}
  checks for persmission of the operator,
  if so; removes the reservation.
  @mohab
*/
module.exports.cancelReservation = [
    function(req, res, next) {
        BusinessOperator.findOne({ userId: req.user.id }, function(err, operator) {
            if (err || operator == null) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Operator not found!'
                    }]
                });
            } else {
                req.operator = operator;
                next();
            }
        });
    },
    function (req, res, next) {
        Reservation.findById(req.body.reservationId, function (err, reservation) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot cancel reservation"
                    }]
                });
            }
            req.body.countParticipants = reservation.countParticipants;
            req.body.slotId = reservation.slotId;
            req.body.dayId = reservation.dayId;
            req.reservation = reservation;
            next();
        });
    },
    function(req, res, next) {
        var activityId = req.reservation.activityId;
        Activity.findById(activityId, function(err, activity) {
            if (err || activity == null) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Activity not found!'
                    }]
                });
            } else {
                req.activity = activity;
                next();
            }
        });
    },
    function (req, res, next) {
        Day.update({
                _id: req.body.dayId,
                "slots._id": req.body.slotId
            }, {
                $inc: {
                    "slots.$.currentParticipants": req.body.countParticipants * (-1)
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
    },
    function(req, res, next) {
        var operator = req.operator;
        var reservation = req.reservation;
        var activity = req.activity;
        if (operator.businessId.equals(activity.businessId)) {
            Reservation.update({ _id: reservation.id }, { $set: { confirmed: strings.RESERVATION_STATUS_CANCELLED } }, function(err, updatedRes) {
                if (err || updatedRes.nModified == "0") {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'The reservation wasn\'t cancelled!'
                        }]
                    });
                } else {
                    res.json({
                        msg: 'The reservation was cancelled successfully'
                    });
                }
            });
        } else {
            res.json({
                errors: [{
                    type: strings.ACCESS_DENIED,
                    msg: 'You don\'t belong to the business owing this activity'
                }]
            });
        }
    },

];