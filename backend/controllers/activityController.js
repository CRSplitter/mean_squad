var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');
var strings = require('./helpers/strings');


/**
 * Show full details of a specific activity.
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next

 */ // @megz, @khattab
module.exports.show = function (req, res, next) {
    req.checkParams('id', 'required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.json({
            errors: errors
        });
        return;
    }


    Activity.findById(req.params.id).populate('activitySlots').populate('businessId').exec(function (err, activity) {

        if (err) {
            res.json({
                errors: [{
                    type: strings.DATABASE_ERROR,
                    msg: strings.INTERNAL_SERVER_ERROR
                }]
            });
            return;
        }

        if (activity) {
            activity.businessId.populate('userId', (err) => {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: strings.INTERNAL_SERVER_ERROR
                        }]
                    });
                }

                return res.json({
                    msg: 'Success',
                    data: {
                        activity: activity
                    }

                });
            })

        }

        if (!activity) {
            return res.json({
                errors: [{
                    type: strings.NOT_FOUND,
                    msg: 'Activity not found'
                }]
            });
        }

    });

};


/**
 * @return array of all activities
 */
module.exports.viewActivities =
    function (req, res) {
        Activity.find()
        .populate({
            path: 'businessId',
            populate: {
                path: 'userId'
            }
        })
            .exec(function (err, activities) {
                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: "Error finding activities"
                        }]
                    });
                }
                if (activities.length == 0) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: "No activities found"
                        }]
                    });
                }
                return res.json({
                    msg: "Activities found",
                    data: {
                        activities: activities
                    }
                });

            });

    }


/**
 * Finds activities related to a certian business
 * @param businessId
 * @return array of activities
 */
module.exports.viewActivitiesOfABusiness = [
    function (req, res, next) {
        var businessId = req.params.id;
        Activity.find({
            businessId: businessId

        }).populate({
            path: 'businessId',
            populate: {
                path: 'userId'
            }
        }).exec((err, activities) => {

            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Error finding activities"
                    }]
                });
            }
            if (activities.length == 0) {
                return res.json({
                    errors: [{
                        type: strings.NO_RESULTS,
                        msg: "No activities for this business"
                    }]
                });
            }


            return res.json({
                msg: "Activities found Successfully.",
                data: {
                    activities
                }
            });



        });

    }
];