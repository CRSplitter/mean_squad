var mongoose = require('mongoose');
var Promotion = mongoose.model('Promotion');

/**
 * @return array of all promotions
 */
module.exports.viewPromotions =
    function(req, res) {
        Promotion.find().exec((err, promotions) => {

            if (err) {
                return next(err);
            }
            var promotionsList = {};

            promotions.forEach((promotion) => {

                promotionsList[promotion._id] = promotion;

            });

            res.send(promotionsList);
        });
    }