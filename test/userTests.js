process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../server');
var mongoose = require('mongoose');
var	User = mongoose.model('User');

var assert = chai.assert;

chai.use(chaiHttp);


// Register tests @ameniawy
describe("/POST register user", function(){

    before(function (done) {
        User.collection.drop();
        User.ensureIndexes(done); // Create indexes after droping the collection
    });

    it("should register a user with working attributes", function(done){
        chai.request(server)
        .post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            username:'ameniawy',
            password:'1234',
            confirmPassword:'1234',
            email:'ameniawy@3bont.com'
        })
        .end(function(err, res){
            var json = JSON.parse(res.text);
            assert.equal(json.message, 'User registered successfully');
            assert.equal(res.status, 200);
            done();
        });
    });

    it("should not regitser a user with a Duplicate username", function(done){
        chai.request(server)
        .post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            username:'ameniawy',
            password:'1234',
            confirmPassword:'1234',
            email:'ameniawy18@gmail.com'
        })
        .end(function(err, res){
            var json = JSON.parse(res.text);
            assert.equal(json.message, 'Duplicate Username');
            assert.equal(res.status, 200);
            done();
        });
    });

});


// Login tests @ameniawy
describe("/POST login user", function(){
    it("should login a user", function(done){
        chai.request(server)
        .post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            username:'ameniawy',
            password:'1234'
        })
        .end(function(err, res){
            var json = JSON.parse(res.text);
            assert.equal(json.message, 'User Authenticated');
            assert.equal(res.status, 200);
            done();
        });

    });

    it("should not login a user with incorrect credentials", function(done){
        chai.request(server)
        .post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            username:'menzzzz',
            password:'1234'
        })
        .end(function(err, res){
            assert.equal(res.status, 401);
            done();
        });

    });

});


// Logout tests @ameniawy
describe("/GET logout user", function(){
    it("should logout user", function(done){
        chai.request(server)
        .get('/user/logout')
        .end(function(err, res){
            var json = JSON.parse(res.text);
            assert.equal(json.message, 'User logged out successfully');
            assert.equal(res.status, 200);
            done();
        });

    });

});