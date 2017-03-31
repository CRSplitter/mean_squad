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
                    error: "Error"
                });
            }

            res.json({
                promotions,
                message: "Success"
            });
        });
    }