var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');
var strings = require('./helpers/strings');

/**
 * @return array of all activities
 */
module.exports.viewActivities =
    function(req, res) {

        Activity.find({},
            function(err, activities) {

                if (err) {
                    return res.json({
                        errors: [{
                            type: strings.DATABASE_ERROR,
                            msg: "Cannot find Activities"
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
    function(req, res, next) {
        var businessId = req.params.id;
        Activity.find({
            businessId: businessId
        }, function (err, activities) {
            if(err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Error finding activities"
                    }]
                });
            }
            if(activities.length == 0) {
                return res.json({
                    errors: [{
                        type: strings.NO_RESULTS,
                        msg: "No activities for this business"
                    }]
                });                
            }
            return res.json({
                msg: "Activities found",
                data: {activities: activities}
            });
        });

    }
];