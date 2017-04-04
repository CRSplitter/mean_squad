/**
 * @module Business Operator Controller
 * @description The controller that is responsible of handling admin's requests
 */


var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');
var	User = mongoose.model('User');
var	Business = mongoose.model('Business');
var BusinessOperator = mongoose.model('BusinessOperator');
var Activity = mongoose.model('Activity');
var Reservation = mongoose.model('Reservation');
var UserController = require('./userController');


/*
 * 5.9: As a business, I can add operator to my business (to make reservation on behalf of clients).
 * A function responsible for register a new business operator.
 * @params email,username, password, confirmPassword
 * @khattab
 */
module.exports.addType = function(req, res, next)
{
  req.body.userType = 'BusinessOperator';
  next();
}


/*
 * A function responsible for creating a new business operator
 * this gets called from the User.register
 * @params user
 * @khattab
 */
module.exports.create = function(req, res, next)
{
  console.log(req.user)
  Business.findOne({ userId: req.user._id }).then(function(business)
  {
    BusinessOperator.create({ userId: req.body.newUser._id, businessId: business._id }).then(function()
      {
        res.status(200).json
        ({
          status: 'succeeded',
          message: 'Business operator was successfully created'
        });

        next();
      }).catch(function(err)
      {
        res.status(500).json
        ({
          status:'failed',
          message: 'Internal server error Create'
        });

        next();
      });
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



/*
  Edits a reservation by an operator.
  @param operator credentials, reservation details : operatorId, reservationId,
  totalPrice, details, countParticipants, confirmed, time
  @return json {message: string, error: string}
  checks for persmission of the operator,
  if so; updates the reservation.
  @mohab
*/
module.exports.editReservation = [

  function(req, res, next) {
    BusinessOperator.findOne({userId: req.user.id}, function(err, operator) {
      printError(err);
      if(operator!=null) {
        req.operator = operator;
        next();
      } else {
        res.json({message: "This operator doesn't exist", error: "true"});
      }
    });
  },
  function(req, res, next) {
    var reservationId = req.body.reservationId;
    Reservation.findById(reservationId, function(err, reservation) {
      printError(err);
      if(reservation!=null) {
        req.reservation = reservation;
        next();
      } else {
        res.json({message: "This reservation doesn't exist", error: "true"});
      }
    });
  },
  function(req, res, next) {
    var activityId = req.reservation.activityId;
    Activity.findById(activityId, function(err, activity) {
      printError(err);
      if(activity!=null) {
        req.activity = activity;
        next();
      } else {
        res.json({message: "This activity doesn't exist", error: "true"});
      }
    });
  },
  function(req, res, next) {
    var operator = req.operator;
    var reservation = req.reservation;
    var activity = req.activity;
    // if the new price/details is null, undefined or 0; it won't change
    var details = req.body.details || reservation.details;
    // these must be passed
    var countParticipants = req.body.countParticipants;
    var totalPrice = parseInt(countParticipants) * parseInt(activity.price);
    // has to be boolean!
    var confirmed = req.body.confirmed;
    var time = req.body.time;
    if(operator.businessId.equals(activity.businessId)) {
      Reservation.update({_id: reservation.id}, {$set: {
        totalPrice: totalPrice,
        details: details,
        countParticipants: countParticipants,
        confirmed: confirmed,
        time: time
      }}, function(err, updateRes) {
        printError(err);
        if(updateRes.nModified!="0") {
          res.json({message: "The reservation was updated successfully!", error: "false"});
        } else {
          res.json({message: "The reservation wasn't updated!", error: "true"});
        }
      });
    } else {
      res.json({message: "You are not allowed!", error: "true"});
    }
  },
];


/*
  Cancels a reservation by an operator.
  @param operator credentials, reservation details : operatorId, reservationId
  @return json {message: string, error: string}
  checks for persmission of the operator,
  if so; removes the reservation.
  @mohab
*/
module.exports.cancelReservation = [
  function(req, res, next) {
    BusinessOperator.findOne({userId: req.user.id}, function(err, operator) {
      printError(err);
      if(operator!=null) {
        req.operator = operator;
        next();
      } else {
        res.json({message: "This operator doesn't exist", error: new Error('no operator found')});
      }
    });
  },
  function(req, res, next) {
    var reservationId = req.body.reservationId;
    Reservation.findById(reservationId, function(err, reservation) {
      printError(err);
      if(reservation!=null) {
        req.reservation = reservation;
        next();
      } else {
        res.json({message: "This reservation doesn't exist", error: "true"});
      }
    });
  },
  function(req, res, next) {
    var activityId = req.reservation.activityId;
    Activity.findById(activityId, function(err, activity) {
      printError(err);
      if(activity!=null) {
        req.activity = activity;
        next();
      } else {
        res.json({message: "This activity doesn't exist", error: "true"});
      }
    });
  },
  function(req, res, next) {
    var operator = req.operator;
    var reservation = req.reservation;
    var activity = req.activity;
    if(operator.businessId.equals(activity.businessId)) {
      Reservation.remove({_id: reservation.id}, function(err, removeRes) {
        printError(err);
        if(removeRes.nRemoved!="0") {
          res.json({message: "The reservation was cancelled successfully!", error: "false"});
        } else {
          res.json({message: "The reservation wasn't cancelled!", error: "true"});
        }
      });
    } else {
      res.json({message: "You are not allowed!", error: "true"});
    }
  },

];

function printError(err) {
  if(err) {
    console.log(JSON.stringify(err));
    throw err;
  }
}
// testing related code!
module.exports.fillDB = function(req, res, next) {
    fillMyDb(function() {
        res.json("Check your db now");
    });
}

module.exports.fillActivity = function(req, res, next) {
    console.log(".k")
    Business.findOne({userId:req.user._id}, function(err, business) {
        console.log(business)
        printError(err);
        fillActivityAndReservation(business, function() {
            res.json("Check your db now, activity!");
        });        
    });

}

// @mohab test, filling database

function fillMyDb(callback) {
    var newUser = new User({
        name: "mohab amr",
        userType: "business",
        username: "mohabamro",
        password: "nopassword",
        email: "mohabamr@gmail.com"
    });
    User.create(newUser, function(err, user) {
        printError(err);
        var newBusiness = new Business({
                name: "west world",
                userId: user._id,
                description: "realistic escapism",
                address: "HBO",
                avgRating: "5",
                operators: [],
                approved: "true" 
            });
        Business.create(newBusiness, function(err, business) {
            printError(err);
            var newUser2 = new User({
                name: "fawzy",
                userType: "operator",
                username: "fawzy",
                password: "nopassword",
                email: "fawzy@gmail.com"
            });
            User.create(newUser2, function(err, user2) {
                printError(err);
                var newOperator = new BusinessOperator({
                    userId: user._id,
                    businessId: business._id
                });
                BusinessOperator.create(newOperator, function(err, operator) {
                    printError(err);
                    Business.update({_id: business._id}, {$push: {
                        operators: operator._id
                    }}, function(err, updateRes) {
                        printError(err);
                        console.log(JSON.stringify(updateRes));
                        callback();
                    });
                });
            })
        });
    }); 
}

function fillActivityAndReservation(business, callback) {
    var newActivity = new Activity({
        name: "dreaming",
        businessId: business._id,
        price: 250,
        maxParticipants: 12,
        minParticipants: 4,
        activityType: "entertainment"
    });
    Activity.create(newActivity, function(err, activity) {
        printError(err);
        var newReservation = new Reservation({
            totalPrice: 1000,
            details: "no details",
            countParticipants: 4,
            activityId: activity._id
        });
        Reservation.create(newReservation, function(err, reservation) {
            printError(err);
            callback();
        }); 
    });
}

// @mohab test
function createTestUser(callback) {
    var newUser = new User({
        name: "mohab amr",
        userType: "operator",
        username: "mohabamroo",
        password: "nopassword",
        email: "mohabamr1@gmail.com"
    });
    User.create(newUser, function(err, user) {
        printError(err);
        callback(user);
    }); 
}

function createTestBusiness(user, callback) {
    var newBusiness = new Business({
            name: "west world",
            userId: user._id,
            description: "realistic escapism",
            address: "HBO",
            avgRating: "5",
            operators: [],
            approved: "true" 
        });
    Business.create(newBusiness, function(err, business) {
        printError(err);
        callback(business);
    });
}

function createTestOperator(user, business, callback) {
    var newOperator = new BusinessOperator({
        userId: user._id,
        businessId: business._id
    });
    BusinessOperator.create(newOperator, function(err, operator) {
        printError(err);
        callback(operator);
    });
}

function pushOperatorInBusiness(operator, business, callback) {
    Business.update({_id: business._id}, {$push: {
        operators: operator._id
    }}, function(err, updateRes) {
        printError(err);
        console.log(JSON.stringify(updateRes));
    });
}
