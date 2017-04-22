var mongoose = require('mongoose');
var Promotion = mongoose.model('Promotion');
var Activity = mongoose.model('Activity');
var strings = require('./helpers/strings');

/**
 * @return array of all promotions
 */
module.exports.viewPromotions =
    function (req, res) {

        Promotion.find().populate('activityId').exec((err, promotions) => {

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
                data: {
                    promotions: promotions
                }
            });
        });
    }


/**
 * Finds promotions related to a certian activity
 * @param activityId
 * @return array of promotions
 * @author ameniawy
 */
module.exports.viewPromotionsOfAnActivity = [
    function (req, res, next) {
        var activityId = req.params.id;
        Promotion.find({
            activityId: activityId
        }, function (err, promotions) {
            if (err) {
                return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: err.message
                    }]
                });
            }
            if (promotions.length == 0) {
                return res.json({
                    errors: [{
                        type: strings.NO_RESULTS,
                        msg: "No promotions for this activity"
                    }]
                });
            }
            return res.json({
                msg: "Promotions found",
                data: {
                    promotions: promotions
                }
            });
        });

    }
];


/**
 * Finds promotions related to a certian business
 * @param businessId
 * @return array of promotions
 * @author ameniawy
 */
module.exports.viewPromotionsOfABusiness = [
    function (req, res, next) {
        var businessId = req.params.businessId;
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
                promotions = promotions.filter(function(promotion){
                    return promotion.activityId != null;
                });
                if (promotions.length == 0) {
                    return res.json({
                        errors: [{
                            type: strings.NO_RESULTS,
                            msg: "No promotions for this business"
                        }]
                    });
                }
                return res.json({
                    msg: "Promotions found",
                    data: {
                        promotions: promotions
                    }
                });
            });
    }
];


/**
 * A function that returns a page # from promotions model
 * @ameniawy
 */
module.exports.viewPromotionsPaginated = [
    function (req, res, next) {
        var page = req.params.page;

        Promotion.find().populate({
                path: 'activityId',
                populate: {
                    path: 'activitySlots'
                }
            })
            .limit(5)
            .skip(5 * page)
            .exec(function (err, promotions) {
                Promotion.count().exec(function (err, count) {
                    if (err) {
                        return res.json({
                            errors: [{
                                type: strings.DATABASE_ERROR,
                                msg: "Error finding promotions"
                            }]
                        });
                    }
                    var count = Math.ceil(count / 5);
                    return res.json({
                        msg: "promotions found",
                        data: {
                            promotions: promotions
                        }
                    });

                });
            });
    }

];