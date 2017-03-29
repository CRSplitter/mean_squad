var mongoose = require('mongoose');
var Business = mongoose.model('Business');

/**
 * @return array of all businesses
 */
module.exports.viewBusinesses =
    function(req, res) {

        Business.find().exec((err, businesses) => {

            var businessesList = {};

            if (err) {
                return res.json({
                    error: "Error"
                });
            }

            businesses.forEach((business) => {

                businessesList[business._id] = business;

            });

            res.json({
                businessesList,
                message: "success"
            });
        });
    }