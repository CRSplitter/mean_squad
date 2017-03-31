var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var userController = require('./userController');

/**
 * @return array of all businesses
 */
module.exports.viewBusinesses =
    function(req, res) {

        Business.find().exec((err, businesses) => {

           
            if (err) {
                return res.json({
                    error: "Error"
                });
            }

            res.json({
                businesses,
                message: "Success"
            });
        });
    }


/**
 * Update Business's info 
 * @param: address : String
 * @param: description : String
 * @param: longitude : String
 * @param: latitude : String
 * @param: contactInfo : String
 * @param: name : String
 * @param: email : String
 * @return: json {error} or {message, user}
 * @IOElgohary
 */
module.exports.update = [
    function(req, res, next) {

        // // Validation
        // req.checkBody('name', 'Name is required').notEmpty();
        // var errors = req.validationErrors();

        // if (errors) {
        //     return res.json({
        //         error: errors
        //     });
        // }

        // // Update
        // req.business.description = req.body.description;
        // req.business.address = req.body.address;
        // req.business.longitude = req.body.longitude;
        // req.business.latitude = req.body.latitude;
        // req.business.contactInfo = req.body.contactInfo;

        // req.business.save((err) => {
        //     if (err) {
        //         return res.json({
        //             error: "Error"
        //         });
        //     }

        //     res.json({
        //         message: "Successfully updated!",
        //         business: req.business
        //     });


        // });
        next();
    },
    userController.update

]