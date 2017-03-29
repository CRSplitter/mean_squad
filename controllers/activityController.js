var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');

/**
 * @return array of all activities
 */
module.exports.viewActivities =
    function(req, res) {

        Activity.find().exec((err, activities) => {

            var activitiesList = {};

            if (err) {
                return res.json({
                    error: "Error"
                });
            }

            activities.forEach((activity) => {

                activitiesList[activity._id] = activity;

            });

            res.json({
                activitiesList,
                message: "Success"
            });
        });
    }