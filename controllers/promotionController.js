var mongoose = require('mongoose');
var Promotion = mongoose.model('Promotion');
var strings = require('./helpers/strings');

/**
 * @return array of all promotions
 */
module.exports.viewPromotions =
    function(req, res) {

        Promotion.find().exec((err, promotions) => {

            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Cannot find promotions"
                    }]
                });
            }
            return res.json({
                msg: "Promotions found",
                data: {promotions: promotions}
            });
        });
    }


/**
 * Finds promotions related to a certian activity
 * @param activityId
 * @return array of promotions
 */
module.exports.viewPromotionsOfAnActivity = [
    function(req, res, next) {
        var activityId = req.params.id;
        Promotion.find({
            activityId: activityId
        }, function (err, promotions) {
            if(err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: "Error finding promotions"
                    }]
                }); 
            }
            if(promotions.length == 0) {
                return res.json({
                    errors: [{
                        type: strings.NO_RESULTS,
                        msg: "No promotions for this activity"
                    }]
                });                
            }
            return res.json({
                msg: "Promotions found",
                data: {promotions: promotions}
            });
        });

    }
];