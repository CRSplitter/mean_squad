/**
 * @module Business Controller
 * @description The controller that is responsible of handling admin's requests
 */


var mongoose = require('mongoose');
var	Business = mongoose.model('Business');


/*
 * A function responsible for deleting a business.
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
