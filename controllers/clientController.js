var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var userController = require('./userController');


/**
 * Update Client's info 
 * @param: dateOfBirth : Date
 * @param: name : String
 * @param: email : String
 * @return: json {error} or {message, user}
 * @IOElgohary
 */

module.exports.update = [
    function(req, res) {

        // Validation
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('name', 'name is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }

        req.client.dateOfBirth = req.body.dateOfBirth

        req.client.save((err) => {
            if (err) {
                return res.json({
                    error: "Error"
                });
            }
            next();
        })
    },
    userController.update
]