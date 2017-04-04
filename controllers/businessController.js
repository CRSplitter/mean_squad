/**
 * @module Business Controller
 * @description The controller that is responsible of handling admin's requests
 */

var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var userController = require('./userController');

/**
 * @return array of all businesses
 */
module.exports.viewBusinesses =
    function (req, res) {

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
 * @param {String} address
 * @param {String} description
 * @param {String} longitude
 * @param {String} latitude
 * @param {String} contactInfo
 * @param {String} name
 * @param {String} email
 * @return {json} error or message, user
 * @IOElgohary
 */
module.exports.update = [
    function (req, res, next) {


        /* var newbusiness = {
             userId: req.user._id,
             name: "testing",
         };

         Business.create(newbusiness, () => {*/

        // Validation
        req.checkBody('name', 'Name is required').notEmpty();
        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }

        var query = {
            userId: req.user._id
        };

        var newData = {
            // Update
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            contactInfo: req.body.contactInfo
        }

        Business.update(query, newData, (err, updated) => {
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


/*
 * A function responsible for deleting a business.
 * @params id
 * @khattab
 */
module.exports.delete = function(req, res, next)
{
  req.checkParams('id', 'required').notEmpty();

  Business.findById(req.params.id).then(function(business)
  {
    if(business)
    {
      business.remove().then(function()
      {
        res.status(200).json
        ({
          status: 'succeeded',
          message: 'Business was successfully deleted'
        });

        next();
      }).catch(function(err)
      {
        res.status(500).json
        ({
          status:'failed',
          message: 'Internal server error'
        });

        next();
      });
    }
    else
    {
      res.status(404).json
      ({
        status:'failed',
        message: 'Business was not found'
      });

      next();
    }
  }).catch(function(err)
  {
    res.status(500).json
    ({
      status:'failed',
      message: 'Internal server error'
    });

    next();
  });
};

