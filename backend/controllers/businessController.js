/**
 * @module Business Controller
 * @description The controller that is responsible of handling admin's requests
 */
var stripe = require("stripe")(process.env.STRIPE_KEY);
var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Activity = mongoose.model('Activity');
var Promotion = mongoose.model('Promotion');
var User = mongoose.model('User');
var Day = mongoose.model('Day');
var businessOperator = require('./businessOperatorController');
var userController = require('./userController');
var strings = require('./helpers/strings');
var User = mongoose.model('User');
var Reservation = mongoose.model('Reservation');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }

});

/**
 * Show full details of a specific business.
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */ // @khattab
module.exports.show = function (req, res, next) {
    req.checkParams('username', 'required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.json({
            errors: errors
        });
        return;
    }

    User.findOne({
        username: req.params.username
    }).then(function (user) {
        if (user) {
            Business.findOne({
                userId: user._id
            }).then(function (business) {
                if (business) {
                    business.userId = user;
                    res.json({
                        msg: 'Success',
                        data: {
                            business: business
                        }
                    });
                    next();

                } else {
                    res.json({
                        errors: [{
                            type: strings.NOT_FOUND,
                            msg: 'Business not found'
                        }]
                    });
                }
            }).catch(function (err) {
                res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            });
        } else {
            res.json({
                errors: [{
                    type: strings.NOT_FOUND,
                    msg: 'User not found'
                }]
            });
        }
    }).catch(function (err) {
        res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: err.message
            }]
        });
    });
};


/**
 * Show full details of a specific business.
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */ // @khattab
module.exports.showById = function (req, res, next) {
    req.checkParams('id', 'required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.json({
            errors: errors
        });
        return;
    }

    Business.findById(req.params.id, function (err, business) {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            });
        } else if (!business) {
            return res.json({
                errors: [{
                    type: strings.NOT_FOUND,
                    msg: 'Business not found'
                }]
            });
        } else {
            return res.json({
                msg: 'Success',
                data: {
                    business
                }
            });
        }
    });
};


/** 5.6
  A function responsible for creating a new Promotion.
  @param activityId, discountValue, details, req.file
  @return: json {errors: [error], msg: string, data: [promotionObject]}
  @ahmaarek
 */
module.exports.createPromotion = [
    //Validation and checking for duplicates
    function (req, res, next) {

        req.checkBody('discountValue', 'Discount Value is required').notEmpty();
        req.checkBody('activityId', 'Activity id is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        }

        if (req.body.discountValue > 100 || req.body.discountValue < 0) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: 'Discount value must be between 0 and 100.'
                }]
            })
        }

        var query = {
            activityId: req.body.activityId,
            discountValue: req.body.discountValue,

        }

        Promotion.find(query, function (err, Promotions) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }
            if (Promotions.length > 0) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'You have already made this promotion'
                    }]

                });
            }
            next();
        });
    },
    //Adding promotion to the DATABASE_ERROR
    function (req, res) {
        var image;

        if (!req.file) {
            image = "defaultPic.png";
        } else {
            image = req.file.filename;
        }

        Promotion.create({
            activityId: req.body.activityId,
            discountValue: req.body.discountValue,
            details: req.body.details,
            image: image
        }, function (err, promotion) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }
            return res.json({
                msg: "Successfully Added Promotion.",
                data: {
                    promotion
                }
            });

        });
    }
]


/** 5.7
  A function responsible for editing a Promotion.
  @param promotionId, activityId, discountValue, details
  @return: json {errors: [error], msg: string, data: [promotionObject]}
  @ahmaarek
 */
module.exports.editPromotion = (req, res) => {

    req.checkBody('discountValue', 'Discount Value is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.json({
            errors: errors
        });
    }


    if (!req.body.promotionId) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Promotion Id is required."
            }]
        })
    }

    var promotionId = req.body.promotionId;
    var image;
    Promotion.getPromotionById(promotionId, (err, promotion) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            });
        }
        if (!promotion) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Promotion not Found.'
                }]
            });

        } else {


            if (req.file == undefined) {
                image = promotion.image;
            } else {
                image = req.file.filename;
            }

            let editedPromotion = {
                $set: {
                    discountValue: req.body.discountValue,
                    details: req.body.details,
                    image: image
                }
            }
            Promotion.updatePromotion(promotionId, editedPromotion, (err, updatedRes) => {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    });
                }
                if (!updatedRes) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'Error Updating Promotion.'
                        }]
                    });
                } else {
                    return res.json({
                        msg: "Promotion Updated Successfully!"
                    });
                }
            });
        }
    });
}


/** 5.8
  A function responsible for removing a Promotion.
  @param promotionId
  @return: json {errors: [error], msg: string, data: [promotionObject]}
  @ahmaarek
 */
module.exports.removePromotion = (req, res) => {
    if (!req.body.promotionId) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Promotion Id is required."
            }]
        })
    }

    var promotionId = req.body.promotionId;
    Promotion.deletePromotion(promotionId, (err, result) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            });
        }
        if (result.nRemoved != "0") {
            return res.json({
                msg: "Promotion was removed successfully!"
            });
        } else {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error removing Promotion.'
                }]
            });
        }
    });
}


/**
  A function responsible for register a new business operator.
  @param email,username, password, confirmPassword
  @carsoli
 */
module.exports.addType = function (req, res, next) {
    req.body.userType = strings.BUSINESS;
    next();
}


/**
    a function responsible for creating a new business operator
    this gets called from the User.register
    @param user
    @return: json {errors: [error], msg: string, data: [businessObject]}
    @carsoli
 */
module.exports.create = function (req, res, next) {

    req.checkBody('name', 'Name is required').notEmpty();

    var errors = req.validationErrors();
    var user = req.body.newUser;

    if (errors) {
        User.findOneAndRemove({
            _id: user._id
        }, (err, removed) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                })
            }

            return res.json({
                errors: errors
            });
        });
    }

    var business = new Business({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        contactInfo: req.body.contactInfo
    });
    business.save((err, business) => {
        if (err) {

            User.findOneAndRemove({
                _id: user._id
            }, (errdel, removed) => {
                if (errdel) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: errdel.message
                        }]
                    })
                }

            });

            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message,
                }]
            });
        }

        if (!business) {

            User.findOneAndRemove({
                _id: user._id
            }, (err, removed) => {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    })
                }

                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Business was not saved.',
                    }]
                });
            });

        } else {
            next();
        }
    });
};


/**
 * @return json {errors: [error], msg: string, data: [businessObject]}
 * @IOElgohary
 */
module.exports.viewBusinesses =
    function (req, res) {

        Business.find().populate('userId').exec((err, businesses) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error Finding Businesses'
                    }]
                });
            }
            res.json({
                msg: "Businesses found Successfully!",
                data: {
                    businesses
                }
            });
        });
    }


/**
 * Update Business's info
 * @param {String} address
 * @param {String} description
 * @param {String} longitude
 * @param {String} latitude
 * @param {String} contactInfo
 * @param {String} name
 * @param {String} email
 * @return json {errors: [error], msg: string, data: [businessObject]}
 * @IOElgohary
 */
module.exports.update = [
    function (req, res, next) {

        // Validation
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }

        var query = {
            userId: req.user._id
        };

        var newData = {
            // Update
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            contactInfo: req.body.contactInfo
        }

        Business.update(query, newData, (err, updated) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error Updating Business'
                    }]
                });
            }

        });

        next();

    },
    userController.update
]


/**
    @description: queries on the userId passed in the body and returns it /    appends businessId in the body
    @param req.user
    @carsoli
*/
module.exports.addBusiness = function (req, res, next) {
    var userId = req.user._id;
    Business.findOne({
        userId: userId
    }, (err, business) => {

        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error Finding business'
                }]
            });

        }

        if (!business) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'No Business associated with this user!'
                }]
            });

        }

        req.body.business = business;
        next();
    });
}


/*
    returns an array of the activities for that business or an err message if none exist
	@params req.body.business
	@return json {errors: [error], msg: string, data: [activityObject]}
	@carsoli
*/
module.exports.viewMyActivities = (req, res) => {
    if (!req.body.business || !req.body.business._id) {
        return res.json({
            erros: [{
                type: strings.INVALID_INPUT,
                msg: "Business Object is required."
            }]
        })
    }
    var businessId = req.body.business._id;

    Activity.find({
            businessId: businessId
        }).populate('businessId').populate('activitySlots')
        .exec(function (err, activities) {

            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error Finding Activities.'
                    }]
                });
            }

            if (!activities) {
                return res.json({
                    errors: [{
                        type: strings.NOT_FOUND,
                        msg: 'No Activities Found.'
                    }]
                });

            } else {
                return res.json({
                    msg: "Activities found Successfully.",
                    data: {
                        activities
                    }
                });
            }
        });

}


/**
    @description: adds an activity to the Activity model using the business' id
	@param: req.body.business, maxParticipants, minParticipants, minAge
    @return json {errors: [error], msg: string, data: [activityObject]}
	@carsoli
*/
module.exports.addActivity = [

    function (req, res, next) {

        // Validation
        req.checkBody('maxParticipants', 'Maximum Participants is required').notEmpty();
        req.checkBody('minParticipants', 'Minimum Participants is required').notEmpty();
        req.checkBody('minAge', 'Minimum Age is required').notEmpty();
        req.checkBody('price', 'Price is required').notEmpty();
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('business', 'Business is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        }

        var maxParticipants = req.body.maxParticipants;
        var minParticipants = req.body.minParticipants;
        var minAge = req.body.minAge;
        var price = req.body.price;
        var hours = req.body.durationHours;
        var minutes = req.body.durationMinutes;

        if (parseInt(maxParticipants, 10) < parseInt(minParticipants, 10)) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Maximum Participants cannot be less than Minimum Participants."
                }]
            })
        }
        if (parseInt(minParticipants, 10) <= 0) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Maximum Participants and Minimum Participants must be atleast 1."
                }]
            })
        }
        if (parseInt(minAge, 10) <= 0) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Minimum Age must be atleast 1."
                }]
            })
        }
        if (parseInt(price, 10) <= 0) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Price must be atleast 1."
                }]
            })
        }
        if (hours < 0 || minutes < 0) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Time cannot be less than zero."
                }]
            })
        }
        if (parseInt(hours, 10) == 0 && parseInt(minutes, 10) == 0) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Hours and minutes cannot both be zero at the same time"
                }]
            })
        }
        if (parseInt(minutes, 10) > 59) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Minutes cannpt be more than 59."
                }]
            })
        }


        var businessId = req.body.business._id;

        var query = {
            businessId: businessId,
            name: req.body.name,

        }

        Activity.find(query, function (err, Activities) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }
            if (Activities.length > 0) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'You have already added an activity with the same name.'
                    }]
                });
            }
            next();
        });
    },

    function (req, res, next) {


        var businessId = req.body.business._id;

        let newActivity = {
            businessId: businessId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            maxParticipants: req.body.maxParticipants,
            minParticipants: req.body.minParticipants,
            minAge: req.body.minAge,
            durationHours: req.body.durationHours,
            durationMinutes: req.body.durationMinutes,
            avgRating: 0,
            activityType: req.body.activityType,
            activitySlots: []

        }

        if (req.file != undefined) {
            newActivity.image = req.file.filename
        } else {
            newActivity.image = "defaultPic.png"
        }

        Activity.createActivity(newActivity, (err, activity) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            if (!activity) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error Creating Activity.'
                    }]
                });
            }
            req.body.activity = activity;

            next();


        });
    },
    // add empty slots for 7 days of the week
    function (req, res, next) {
        for (i = 0; i < 7; i++) {
            Day.create({
                day: strings.WEEK_DAY[i],
                slots: []
            }, function (err, day) {
                Activity.findByIdAndUpdate(req.body.activity._id, {
                        $push: {
                            activitySlots: day._id
                        }
                    }, {
                        safe: true,
                        upsert: true,
                        new: true
                    },
                    function (err, updatedActivity) {
                        if (err) {
                            return res.json({
                                errors: [{
                                    type: strings.DATABASE_ERROR,
                                    msg: 'Error adding slot.'
                                }]
                            });
                        }
                    });
            });
        }
        next();
    },
    function (req, res, next) {
        return res.json({
            msg: "Activity Added Successfully",
            data: {
                activity: req.body.activity
            }
        });
    }
];


/**
    @description: adds a slot to a certain day of the week
	@param: dayId, maxParticipants, time
	@ameniawy
*/
module.exports.addTiming = [
    function (req, res, next) {
        req.checkBody('maxParticipants', 'Maximum Participants is required').notEmpty();
        req.checkBody('time', 'Time is required').notEmpty();
        req.checkBody('dayId', 'Day is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        }


        var dayId = req.body.dayId;
        let slot = {
            time: req.body.time,
            maxParticipants: req.body.maxParticipants
        };
        Day.findByIdAndUpdate(dayId, {
                $push: {
                    slots: slot
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
                            msg: 'Error adding slot.'
                        }]
                    });
                }

                if (!day) {
                    return res.json({
                        errors: [{
                            type: strings.NO_RESULTS,
                            msg: 'No Day with this Id.'
                        }]
                    });
                }

                return res.json({
                    msg: "Slot Added Successfully"
                });

            });

    }
];


/**
    @description: removes a slot to a certain day of the week
	@param: dayId, slotId
	@ameniawy
*/
module.exports.removeTiming = [
    function (req, res, next) {

        req.checkBody('dayId', 'Day is required').notEmpty();
        req.checkBody('slotId', 'Slot is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
        }

        Day.findByIdAndUpdate(req.body.dayId, {
                $pull: {
                    slots: {
                        _id: req.body.slotId
                    }
                }
            }, {
                safe: true,
                upsert: true,
                new: true
            },
            function (err, updatedDay) {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: 'Error removing slot.'
                        }]
                    });
                }

                return res.json({
                    msg: "Slot removed Successfully"
                });
            });

    }
];


/**
    @description: removes *one* specified activity that belongs to the business completely from the db
	@param: req.body.activityId,req.body.business
	@return json {errors: [error], msg: string}
	@carsoli
*/
module.exports.removeActivity = [
    removeActivityFunc,
    getReservations,
    notifyClients,
    refund,
    reduceBalance,


]

function removeActivityFunc(req, res, next) {
    req.checkBody('activityId', 'Activity is required').notEmpty();
    req.checkBody('business', 'Business is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.json({
            errors: errors
        });
    }


    let activityId = req.body.activityId; //passed from frontend (when pressing a button)
    let businessId = req.body.business._id;

    Activity.getActivityById(activityId, (err, activity) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            });
        }
        if (!activity) {
            return res.json({
                errors: [{
                    type: strings.NOT_FOUND,
                    msg: 'No Activities Available.'
                }]
            });
        }

        if (businessId == activity.businessId.toString()) {
            Activity.deleteActivity(activityId, (delErr, delResult) => {
                if (delErr) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: delErr.message
                        }]
                    });
                }
                console.log('sdadadasd');
                return res.json({
                    msg: "Successfully deleted activity."
                })
            });
        } else {
            return res.json({
                errors: [{
                    type: strings.ACCESS_DENIED,
                    msg: "Not authorized to Perform this deletion"
                }]
            })
        }

    });
}

function getReservations(req, res, next) {

    let activityId = req.body.activityId;

    Reservation.find({
            activityId: activityId
        }).populate({
            path: 'clientId',
            populate: {
                path: "userId"
            }
        }).populate({
            path: 'activityId',
            populate: {
                path: "businessId"
            }
        })
        .exec((err, reservations) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                })
            }

            if (!reservations || reservations.length == 0) {
                return res.json({
                    msg: "Deleted Successfully"
                })
            }

            req.body.reservations = reservations;
            next();
        })

}

function notifyClients(req, res, next) {
    let reservations = req.body.reservations;
    let toBeRefunded = [];
    reservations.forEach(function (reservation) {
        if (reservation.confirmed == 'Confirmed') {
            var curr = new Date();
            if ((curr - reservation.date) > 0)
                toBeRefunded.push(reservation);
            var mailOptions = {
                to: reservation.clientId.userId.email,
                from: 'reservationcancelled@noreply.com',
                subject: 'Activity Deleted',
                text: 'You are receiving this because your reservation for: ' + reservation.activityId.name + ' has been cancelled.\n' +
                    'Reason: Activity has been Deleted by the business: ' + reservation.activityId.businessId.name + '.\n\n' +
                    'Your money will be refunded in 5-10 business days.\n\n'
            };

            smtpTransport.sendMail(mailOptions, function (err) {

                if (err)
                    return res.json({
                        errors: [{
                            type: strings.INTERNAL_SERVER_ERROR,
                            msg: 'Error sending Activity cancelled notification.'
                        }]
                    });


            });
        } else if (reservation.confirmed == 'Pending') {

            var mailOptions = {
                to: reservation.clientId.userId.email,
                from: 'reservationcancelled@noreply.com',
                subject: 'Activity Deleted',
                text: 'You are receiving this because your reservation for: ' + reservation.activityId.name + ' has been cancelled.\n' +
                    'Reason: Activity has been Deleted by the business: ' + reservation.activityId.businessId.name + '.\n\n'
            };

            smtpTransport.sendMail(mailOptions, function (err) {

                if (err)
                    return res.json({
                        errors: [{
                            type: strings.INTERNAL_SERVER_ERROR,
                            msg: 'Error sending Activity cancelled notification.'
                        }]
                    });


            });
        }

        reservation.confirmed = strings.RESERVATION_STATUS_CANCELLED;
        reservation.save((err) => {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                })
            }
        })
    });

    req.body.toBeRefunded = toBeRefunded
    next();
}

function refund(req, res, next) {

    let reservations = req.body.toBeRefunded;
    let total = 0;
    reservations.forEach(function (reservation) {
        business = reservation.businessId;
        total += reservation.totalPrice;
        if (reservation.chargeId) {

            stripe.refunds.create({
                charge: reservation.chargeId
            }, function (err, refund) {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.INTERNAL_SERVER_ERROR,
                            msg: err.message
                        }]
                    })
                }
            });
            reservation.chargeId = null;
            reservation.save((err) => {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: err.message
                        }]
                    })
                }
            })
        }

    });


    req.body.total = total;
    next();

}

function reduceBalance(req, res, next) {
    var business = req.body.business;
    business.balance -= req.body.total;
    business.save((err) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            })
        }
        next();
    })

}

/**
    @description updates the details of *one* activity that belongs to the business
	@param req.body.activityId,req.body.business
	@return json {errors: [error], msg: string, data [activityObject]}
	@carsoli
*/
module.exports.editActivity = (req, res) => {

    req.checkBody('activityId', 'Activity is required').notEmpty();
    req.checkBody('business', 'Business is required').notEmpty();
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('maxParticipants', 'Maximum Participants is required').notEmpty();
    req.checkBody('minParticipants', 'Minimum Participants is required').notEmpty();
    req.checkBody('minAge', 'Minimum Age is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('durationHours', 'Hours field is required').notEmpty();
    //req.checkBody('durationMinutes', 'Minutes field is required').notEmpty();


    var errors = req.validationErrors();

    if (errors) {
        return res.json({
            errors: errors
        });
    }

    var maxParticipants = parseInt(req.body.maxParticipants, 10);
    var minParticipants = parseInt(req.body.minParticipants, 10);
    var minAge = parseInt(req.body.minAge, 10);
    var price = parseInt(req.body.price, 10);
    var hours = parseInt(req.body.durationHours, 10);
    var minutes = parseInt(req.body.durationMinutes, 10);

    if (maxParticipants < minParticipants) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Maximum Participants cannot be less than Minimum Participants."
            }]
        })
    }
    if (minParticipants <= 0) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Maximum Participants and Minimum Participants must be atleast 1."
            }]
        })
    }
    if (minAge <= 0) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Minimum Age must be atleast 1."
            }]
        })
    }
    if (price <= 0) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Price must be atleast 1."
            }]
        })
    }
    if (hours < 0 || minutes < 0) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Time cannot be less than zero."
            }]
        })
    }
    if (hours == 0 && minutes == 0) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Hours and minutes cannot both be zero at the same time"
            }]
        })
    }
    if (minutes > 59) {
        return res.json({
            errors: [{
                type: strings.INVALID_INPUT,
                msg: "Minutes cannpt be more than 59."
            }]
        })
    }


    let activityId = req.body.activityId;
    let businessId = req.body.business._id;

    Activity.getActivityById(activityId, (err, activity) => {

        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: err.message
                }]
            });
        }

        if (!activity) {
            return res.json({
                errors: [{
                    type: strings.NOT_FOUND,
                    msg: "No Activity to Edit."
                }]
            });

        } else {

            if (businessId == activity.businessId.toString()) {
                //edit this to be a set query
                let editedActivity = {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price || 0,
                        maxParticipants: req.body.maxParticipants || 0,
                        minParticipants: req.body.minParticipants || 0,
                        minAge: req.body.minAge || 0,
                        durationHours: req.body.durationHours || 0,
                        durationMinutes: req.body.durationMinutes || 0,
                        activityType: req.body.activityType
                    }
                }
                if (req.file != undefined) {
                    editedActivity.image = req.file.filename;
                }
                Activity.updateActivity(activityId, editedActivity, (updatedErr, updatedRes) => {

                    if (updatedErr) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: updatedErr.message
                            }]
                        });
                    }
                    if (!updatedRes) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: "No Activity to Update."
                            }]
                        });
                    } else {
                        return res.json({
                            msg: "Activity Updated Successfully",
                            data: {
                                activity: updatedRes
                            }
                        });
                    }
                });

            } else {
                return res.json({
                    errors: [{
                        type: strings.ACCESS_DENIED,
                        msg: "Not authorized to Update this Activity."
                    }]

                });
            }
        }
    });

}


/**
    @description views a list of Promotions offered by the business
	@param req.body.business
	@return json {errors: [error], msg: string, data [promotionObject]}
	@carsoli
*/
module.exports.viewMyPromotions = [
    function (req, res, next) {
        if (!req.body.business || !req.body.business._id) {
            return res.json({
                errors: [{
                    type: strings.INVALID_INPUT,
                    msg: "Business Object is required"
                }]
            })
        }

        var businessId = req.body.business._id;
        Promotion.find().populate('activityId', null, {
                businessId: businessId
            })
            .exec(function (err, promotions) {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: "Error finding promotions"
                        }]
                    });
                }
                promotions = promotions.filter(function (promotion) {
                    return promotion.activityId != null;
                });
                if (promotions.length == 0) {
                    return res.json({
                        errors: [{
                            type: strings.NO_RESULTS,
                            msg: "You have no promotions"
                        }]
                    });
                }
                return res.json({
                    msg: "Promotions found",
                    data: {
                        promotions
                    }
                });
            });
    }
];


/**
 * A function responsible for deleting a business.
 * @khattab
 */
module.exports.delete = function (req, res, next) {

    req.checkParams('businessId', 'required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.json({
            errors: errors
        });
    }

    Business.findById(req.params.id).then(function (business) {

        if (business) {
            business.remove().then(function () {
                res.json({
                    msg: 'Business was successfully deleted'
                });

                next();

            }).catch(function (err) {
                res.json({
                    errors: [{
                        type: strings.INTERNAL_SERVER_ERROR,
                        msg: "Internal Server Error."
                    }]
                });
                next();
            });

        } else {
            res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: "Business not Found."
                }]
            });

            next();
        }
    }).catch(function (err) {
        res.json({
            errors: [{
                type: strings.INTERNAL_SERVER_ERROR,
                msg: "Internal Server Error."
            }]
        });

        next();
    });
};


/**
 * Find businessed of page #
 * @ameniawy
 */
module.exports.viewBusinessesPaginated = [
    function (req, res, next) {
        var page = req.params.page;

        Business.find()
            .populate('userId')
            .limit(5)
            .skip(5 * page)
            .exec(function (err, businesses) {
                Business.count().exec(function (err, count) {
                    if (err) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: "Error finding businesses"
                            }]
                        });
                    }
                    var count = Math.ceil(count / 5);
                    return res.json({
                        msg: "businesses found",
                        data: {
                            businesses: businesses
                        }
                    });

                });
            });
    }

];