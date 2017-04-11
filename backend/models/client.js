/**
*  @mixin Client
*  @property {String} email User's email
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Strings = require('../controllers/helpers/strings');

var clientSchema = new Schema({
    dateOfBirth: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: "true"
    },
    verified: {type:String, default: Strings.CLIENT_UNVERIFIED},
    verificationToken: String
});


var Client = mongoose.model('Client', clientSchema);
module.exports = Client;
