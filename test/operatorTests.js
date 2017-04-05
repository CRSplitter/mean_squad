process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server');
var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');
var Activity = mongoose.model('Activity');
var User = mongoose.model('User');
var BusinessOperator = mongoose.model('BusinessOperator');
var Business = mongoose.model('Business');
var Payment = mongoose.model('Payment');
var Promotion = mongoose.model('Promotion');

var assert = chai.assert;

chai.use(chaiHttp);
function printError(err) {
    if(err) {
        console.log(JSON.stringify(err));
        throw err;
    }
}
var req;
// edit reservation by operator test @mohab
describe("/POST edit reservation", function() {

    before(function(done) {
        User.collection.drop();
        Business.collection.drop();
        BusinessOperator.collection.drop();
        Reservation.collection.drop();
        Activity.collection.drop();
        User.ensureIndexes(done); // Create indexes after droping the collection
    });

    it("should edit a reservation with given attributes", function(done) {
        req = chai.request(server);
        fillMyDb(function() {
            req.post('/businessoperator/editReservation')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                reservationId: req.reservationId,
                userId: req.user._id,
                totalPrice: 818181,
                details: "mohab deto",
                countParticipants: 7,
                confirmed: true,
                time: "2008-12-12"
            })
            .end(function(err, res) {
                console.log(res)
                var json = JSON.parse(res);
                assert.equal(json.message, 'The reservation was updated successfully!');
                assert.equal(res.status, 200);
                done();
            });
        });

        
    });

});


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
        req.user = user;
        console.log("user: "+user);
        console.log("req.user: " +user)
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
                        fillActivityAndReservation(business, callback);
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
            req.reservationId = reservation._id;
            callback();
        }); 
    });
}
