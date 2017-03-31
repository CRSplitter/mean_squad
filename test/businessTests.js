process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server');
var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var supertest = require('supertest');
var assert = chai.assert;
var User = mongoose.model('User');

chai.use(chaiHttp);

// View list of all Businesses
describe('/GET view all Businesses', function () {

    before(function (done) {
        Business.collection.drop(()=>{
              Business.ensureIndexes(done);
        });
      
    });

    it("should return list of all Businesses in the database", function (done) {

        var user = {
            email:"test@mail.com",
            username: "ubisoft",
            password: "1234"
        }

        User.create(user);
        var id;
        User.findOne().sort().exec((err,user1)=>{
            id = user1._id;
            var business1 = new Business({
            name: "Ubisoft",
            userId: id,
            description: "la2et el game ma kemletsh gebtelak glitches"
        });
        business1.save();
        });
    
        chai.request(server)
            .get('/businesses')
            .end((err, res) => {

                var json = JSON.parse(res.text);
                assert.equal(json.message, 'Success');
                assert.equal(json.businesses.length, 1);
                assert.equal(res.status, 200);
                done();
            });
    });
})