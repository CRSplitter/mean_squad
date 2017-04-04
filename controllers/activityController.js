var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');

/**
 * @return array of all activities
 */
module.exports.viewActivities =
    function (req, res) {

        Activity.find({},
            function (err, activities) {
                
                if (err) {
                    return res.json({
                        error: "Error"
                    });
                }
                
                res.json({
                    activities: activities,
                    message: "Success"
                });
            });
    }