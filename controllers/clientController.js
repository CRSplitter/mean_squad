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
            dateOfBirth: req.body.dateOfBirth
        }

        Client.update(query, newData, (err, updated) => {
            if (err) {
                return res.json({
                    error: err.message
                });
            }
            next();
        });
        // });
    },
    userController.update
]


/**
 * register new client 
 * @param: dateOfBirth : Date
 * @return: json {error} or {message, user}
 * @ameniawy
 */
module.exports.register = [
    function(req, res, next) {
        var user = req.body.newUser;
        Client.create({
            userId: user._id,
            dateOfBirth: req.body.dateOfBirth
        }, function(err, client) {
            if(err) {
                res.status(500).json({
                    status:'failed',
                    message: 'Internal server error'
                });      
            }
            
            res.status(200).json({
                status: 'succeeded',
                message: 'Client was successfully created'
            });

        });
        
    }
];