/**
*  @mixin Business
*  @property {String} name Business title
*  @property {String} description Business description
*  @property {String} address Business address
*  @property {Number} latitude Business latitude
*  @property {Number} longitude Business longitude
*  @property {Number} avgRating Business average rating
*  @property {String} contactInfo Business contact info
*  @property {String} approved Business aprroved status
*/


var mongoose = require('mongoose');
require('mongoose-type-email');
var Schema = mongoose.Schema;

var businessSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: 'true',
        required: true
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    contactInfo: {
        type: String
    },
    videoId: {
        type: String
    },
    links: [{
        type: String
    }],
    operators: [{
        type: Schema.Types.ObjectId,
        ref: 'BusinessOperator'
    }],
    approved: {type: String, default: 'Pending'},
    balance: {type:Number, default:0}
});

var Business = mongoose.model('Business', businessSchema);
module.exports = Business;

module.exports.createBusiness = function(newBusiness, callback) {
    Business.create(newBusiness, callback);
}

module.exports.getBusinessByName = function(name, callback) {
    Business.findOne({ name: name }, callback);
}

module.exports.getBusinessById = function(businessId, callback) {
Business.findById(businessId, callback);
}

module.exports.getBusinessesByAvgRating = function(avgRating, callback) {
    Business.find(avgRating, callback);
}
