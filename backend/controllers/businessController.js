/**
 * @module Business Controller
 * @description The controller that is responsible of handling admin's requests
 */

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
                        msg: strings.INTERNAL_SERVER_ERROR
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
        console.log(err);
        res.json({
            errors: [{
                type: strings.DATABASE_ERROR,
                msg: strings.INTERNAL_SERVER_ERROR
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

    Business.findById(req.params.id, function(err, business) {
        if(err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error finding business'
                }]
            });
        }
        else if(!business) {
            return res.json({
                errors: [{
                    type: strings.NOT_FOUND,
                    msg: 'Business not found'
                }]
            });            
        }
        else {
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
        console.log('visisted');
        var discountValue = req.body.discountValue;
        var details = req.body.details;
        var image = req.body.image;

        req.checkBody('discountValue', 'Discount Value is required').notEmpty();
        req.checkBody('details', 'Details are required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
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
            // TODO: ADD DEFAULT IMAGE
            image = "default.jpg";
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
                        msg: 'Error Creating Promotion.'
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

    var promotionId = req.body.promotionId;
    var image;
    Promotion.getPromotionById(promotionId, (err, promotion) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error Finding Promotion.'
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


            req.checkBody('discountValue', 'Discount Value is required').notEmpty();

            var errors = req.validationErrors();

            if (errors) {
                return res.json({
                    errors: errors
                });
            }

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
                            msg: 'Error editing Promotion.'
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
    var promotionId = req.body.promotionId;
    Promotion.deletePromotion(promotionId, (err, result) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error removing Promotion.'
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
            return res.json({
                msg: "Business Saved Successfully.",
                data: {
                    business
                }
            });
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
    if(req.user.userType == strings.BUSINESS_OPERATOR) {
        next();
    }
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

    var businessId = req.body.business._id;

    Activity.find({businessId: businessId}).populate('businessId').populate('activitySlots')
            .exec(function(err, activities) {
                
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
                            type: strings.DATABASE_ERROR,
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

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                errors: errors
            });
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
            avgRating: req.body.avgRating,
            activityType: req.body.activityType,
            activitySlots: []

        }

        if (req.file != undefined) {
            newActivity.image = req.file.filename
        } else {
            // TODO: ADD DEFAULT IMAGE
            newActivity.image = "defaultActivity.jpg"
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
            msg: "Activity Added Successfully"
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
module.exports.removeActivity = (req, res) => {
    let activityId = req.body.activityId; //passed from frontend (when pressing a button)
    let businessId = req.body.business._id;

    Activity.getActivityById(activityId, (err, activity) => {
        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error Finding Activity.'
                }]
            });
        }
        if (!activity) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
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
                            msg: 'Error Deleting Activity.'
                        }]
                    });
                }
                return res.json({
                    msg: "Activity Removed Successfully"
                });
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


/**
    @description updates the details of *one* activity that belongs to the business
	@param req.body.activityId,req.body.business
	@return json {errors: [error], msg: string, data [activityObject]}
	@carsoli
*/
module.exports.editActivity = (req, res) => {
    let activityId = req.body.activityId;
    let businessId = req.body.business._id;

    Activity.getActivityById(activityId, (err, activity) => {

        if (err) {
            return res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: 'Error Finding Activity.'
                }]
            });
        }

        if (!activity) {
            return res.json({
                errors: [{
                    type: strings.ACCESS_DENIED,
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
