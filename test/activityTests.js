process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server');
var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');
var supertest = require('supertest');
var assert = chai.assert;

chai.use(chaiHttp);

// View list of all Activities
describe('/GET view all activities', function () {

    before(function (done) {
        Activity.collection.drop(() => {
            Activity.ensureIndexes(done);
        });
    });

    it("should return list of all activities in the database", function (done) {
        const activity1 = new Activity({
            name: "SE Project",
            description: "Abandon all courses for one course"
        });
        activity1.save();

        const activity2 = new Activity({
            name: "The Office Marathon",
            description: "fun that turns into an obligation"
        });

        activity2.save();

        const activity3 = new Activity({
            name: "read the big short",
            description: "Investors betting on a global financial drama."
        });

        activity3.save();

        chai.request(server)
            .get('/activities')
            .end((err, res) => {

                var json = JSON.parse(res.text);
                assert.equal(json.message, 'Success');
                assert.equal(json.activities.length, 3);
                assert.equal(res.status, 200);
                done();
            });
    });

});