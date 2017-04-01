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
    function (req, res, next) {

        /*var newClient = {
            dateOfBirth: "11-2-1980",
            userId: req.user._id
        };

        Client.create(newClient, () => {*/

        // Validation
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('name', 'name is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }


        var query = {
            // find query
            userId: req.user._id
        };

        var newData = {
            // Update
            ndateOfBirth: req.body.dateOfBirth
        }

        Client.update(query, newData, (err, updated) => {
            if (err) {
                return res.json({
                    error: err.message
                });
            }
        });
        // });
        next();
    },
    userController.update
]