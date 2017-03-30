var mongoose = require('mongoose');
var Promotion = mongoose.model('Promotion');

/**
 * @return array of all promotions
 */
module.exports.viewPromotions =
    function(req, res) {

        Promotion.find().exec((err, promotions) => {

            var promotionsList = {};
            var i = 0;
            if (err) {
                return res.json({
                    error: "Error"
                });
            }

            promotions.forEach((promotion) => {

                promotionsList[i++] = promotion;

            });

            res.json({
                promotionsList,
                message: "success"
            });
        });
    }