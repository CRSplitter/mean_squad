/**
 *  @mixin Client
 *  @property {Date} dateOfBirth Client's date of birth
 *  @property {String} verified Client status
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
    verified: {
        type: String,
        default: Strings.CLIENT_UNVERIFIED
    },
    verificationToken: String
});


var Client = mongoose.model('Client', clientSchema);
module.exports = Client;
