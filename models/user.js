/**
*  @mixin User
*  @property {String} email User's email
*  @property {String} username User's username
*  @property {String} password User's password
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var strings = require('../controllers/helpers/strings');

var userSchema = new Schema({
      email: { type: String, unique: true, required: true },
      username: { type: String, unique: true, index: true, required: true },
      password: String,
      name:String,
      profileImage:String,
      userType:String,
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      facebook: {
                id: String,
                token: String,
    }


});

userSchema.pre('save', function(done) {
    var user = this;

    if (!user.isModified('password')) {
        return done();
    }

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return done(err);
        }
        user.password = hash;
        return done();
    });
});

userSchema.methods.checkPassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        return done(err, isMatch);
    });
};

userSchema.methods.delete = (userObjId, callback) => {
    User.findOneAndRemove({_id: userObjId}, callback);
};

userSchema.methods.isAdmin = function ()
{
  return this.userType === strings.SITE_ADMIN;
};

userSchema.methods.isBusiness = function ()
{
  return this.userType === strings.BUSINESS;
};

userSchema.methods.isBusinessOperator = function ()
{
  return this.userType === strings.BUSINESS_OPERATOR;
};

userSchema.methods.isClient = function ()
{
  return this.userType === strings.CLIENT;
};



mongoose.model('User', userSchema);
