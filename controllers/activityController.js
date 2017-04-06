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
                    data: [{
                        Activities: activities
                    }]
                });
            });
    }