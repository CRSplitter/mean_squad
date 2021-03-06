/**
*  @mixin User
*  @property {String} email User's email
*  @property {String} username User's username
*  @property {String} password User's password
*  @property {String} name User's name
*  @property {String} profileImage User's profileImage
*  @property {String} userType User's type
*  @property {String} resetPasswordToken User's reset password token
*  @property {Date} resetPasswordExpires User's reset password expiration date
*  @property {Object} facebook User's facebook id and token
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var strings = require('../controllers/helpers/strings');

var userSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        select: true
    },
    username: {
        type: String,
        unique: true,
        index: true,
        required: true,
        select: true
    },
    password: {type: String, select: false},
    name: {type: String, select: true},
    profileImage: {type: String, select: true},
    userType: {type: String, select: true},
    resetPasswordToken: {type: String, select: true},
    resetPasswordExpires: Date,
    facebook: {
        id: {type: String, select: true},
        token: {type: String, select: true},

    },
     verified: {
        type: String,
        default: "unverified"
    },
    verificationToken:{type:String}


});

userSchema.pre('save', function (done) {
    var user = this;

    if (!user.isModified('password')) {
        return done();
    }

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return done(err);
        }
        user.password = hash;
        return done();
    });
});

userSchema.methods.checkPassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        return done(err, isMatch);
    });
};

userSchema.methods.isAdmin = function () {
    return this.userType === strings.SITE_ADMIN;

};

userSchema.methods.isBusiness = function () {
    return this.userType === strings.BUSINESS;
};

userSchema.methods.isBusinessOperator = function () {
    return this.userType === strings.BUSINESS_OPERATOR;
};

userSchema.methods.isClient = function () {
    return this.userType === strings.CLIENT;
};

userSchema.methods.isVerified = function(){
    return this.verified === strings.CLIENT_VERIFIED;
}

mongoose.model('User', userSchema);

userSchema.methods.delete = (userObjId, callback) => {
    User.findOneAndRemove({
        _id: userObjId
    }, callback);
};
