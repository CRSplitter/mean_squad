process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server');
var mongoose = require('mongoose');
var Promotion = mongoose.model('Promotion');
var supertest = require('supertest');
var assert = chai.assert;
var Activity = mongoose.model('Activity');

chai.use(chaiHttp);

// View list of all Promotions
describe('/GET view all Promotion', function () {

    before(function (done) {

        Promotion.collection.drop(() => {
            Promotion.ensureIndexes(done);
        });
    });

    it("should return list of all Promotions in the database", function (done) {

       
            var promotion = new Promotion({
                details: "Mini Project +6%",
            });
            promotion.save();

        chai.request(server)
            .get('/promotions')
            .end((err, res) => {
                var json = JSON.parse(res.text);
                assert.equal(json.message, 'Success');
                assert.equal(json.promotions.length, 1);
                assert.equal(res.status, 200);
                done();
            });
    });
});