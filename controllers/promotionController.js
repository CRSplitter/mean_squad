var mongoose = require('mongoose');
var Promotion = mongoose.model('Promotion');

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
                data: [{
                    Promotions: promotions
                }]
            });
        });
    }