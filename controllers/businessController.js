var mongoose = require('mongoose');
var Business = mongoose.model('Business');

/**
 * @return array of all businesses
 */
module.exports.viewBusinesses =
    function(req, res) {
        Business.find().exec((err, businesses) => {

            if (err) {
                return next(err);
            }
            var businessesList = {};

            businesses.forEach((business) => {

                businessesList[business._id] = business;

            });

            res.send(promotionsList);
        });
    }