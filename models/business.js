/**
*  @mixin Business
*  @property {String} name Business title
*  TODO...
*/


var mongoose = require('mongoose');
require('mongoose-type-email');
var Schema = mongoose.Schema;

var businessSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
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
    avgRating: {
        type: Number
    },
    contactInfo: {
        type: String
    },
    operators: [{
        type: Schema.Types.ObjectId,
        ref: 'BusinessOperator'
    }],
    approved: {type: String, default: 'Pending'}
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
