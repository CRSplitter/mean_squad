var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');

/**
 * @return array of all activities
 */
module.exports.viewActivities =
    function(req, res) {
        Activity.find().exec((err, activities) => {

            if (err) {
                return next(err);
            }
            var activitiesList = {};

            activities.forEach((activity) => {

                activitiesList[activity._id] = activity;

            });

            res.send(activitiesList);
        });
    }