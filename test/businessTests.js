process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server');
var mongoose = require('mongoose');
var Bssiness = mongoose.model('Business');
var supertest = require('supertest');
var assert = chai.assert;

chai.use(chaiHttp);

// View list of all Businesses
describe('/POST view all Businesses', function () {

    before(function (done) {
        Business.collection.drop();
        Business.ensureIndexes(done);

    });

    it("should return list of all activities in the database", function (done) {
        var business1 = new Business({
            name: "Ubisoft",
            userId: "1",
            description: "la2et el game ma kemletsh gebtelak glitches"
        });
        business1.save();

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