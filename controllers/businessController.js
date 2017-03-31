/**
 * @module Business Controller
 * @description The controller that is responsible of handling business's requests
 */

var mongoose = require('mongoose');
var	User = mongoose.model('User');
var BusinessOperator = mongoose.model('BusinessOperator');

/**
 * A function responsible for promoting a user to become a business operator.
 * @param  {HTTP}   req  The request object
 * @param  {HTTP}   res  The response object
 * @param  {Function} next Callback function that is called once done with handling the request
 * @ignore
 */
module.exports.promote = function(req, res, next)
{
  // Validatation
  req.checkBody('id', 'required').notEmpty();
  req.checkBody('userType', 'required').notEmpty();
  req.checkBody('userType', 'not valid').isString();
  req.checkBody('userType', 'not valid').isIn(["Operator"]);

  var errors = req.validationErrors();
  if (errors)
  {
     res.status(400).json
        ({
           status: 'failed',
           errors: errors
        });

     next();
     return;
  }

  // check if there is a business operator with this id
  BusinessOperator.findById(req.body.userId).then(function(businessOperator)
  {
    User.findById(req.body.userId).then(function(user)
    {
      if(!user)
      {
        res.status(404).json
        ({
          status:'failed',
          message: 'User not found'
        });

        next();
      }
      else
      {
        // found the user
        if(!businessOperator)
        {
          // and he's not a buisness operator
          BusinessOperator.create({userId: req.body.userId, businessId: req.user.businessId}).then(function()
          {
            // update the type
            user.update({ userType: req.body.userType }).then(function()
            {
              res.status(200).json
              ({
                status: 'succeeded',
                message: 'User type was successfully updated'
              });

              next();
            }).catch(function(err)
            {
              // failed to update the user in the database
              res.status(500).json
              ({
                status:'failed',
                message: 'Internal server error'
              });

              next();
            });
          }).catch(function(err)
          {
            // failed to create the business operator in the database
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
          // there's already a business operator
          res.status(404).json
          ({
            status:'failed',
            message: 'Page not found'
          });
        }
      }
    }).catch(function(err)
    {
      // failed to get the user from the database
      res.status(500).json
      ({
        status:'failed',
        message: 'Internal server error'
      });

      next();
    });
  }).catch(function(err)
  {
    // failed to get the business operator from the database
    res.status(500).json
    ({
      status:'failed',
      message: 'Internal server error'
    });

    next();
  });
};
