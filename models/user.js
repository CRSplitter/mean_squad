var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var crypto = require('crypto');

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true, select: false },
    name: String,
    profileImage: String,
    userType: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
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
  return this.userType === 'Admin';
};

userSchema.methods.isBusiness = function ()
{
  return this.userType === 'Business';
};

userSchema.methods.isBusinessOperator = function ()
{
  return this.userType === 'BusinessOperator';
};

userSchema.methods.isClient = function ()
{
  return this.userType === 'Client';
};

mongoose.model('User', userSchema);