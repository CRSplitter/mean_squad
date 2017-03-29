var mongoose = require('mongoose');
require('mongoose-type-email');
var Schema = mongoose.Schema;

var businessOperatorSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    businessId: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    }
});

var BuisnessOperator = mongoose.model('BuisnessOperator', businessOperatorSchema);
module.exports = BuisnessOperator

module.exports.createBusinessOperator = function(newBusinessOperator, callback) {
    newBusinessOperator.save(callback);
}

module.exports.getBusinessOperatorByName = function(name, callback) {
    BusinessOperator.findOne({ name: name }, callback);
}

module.exports.getBusinessOperatorByUsername = function(username, callback) {
    BusinessOperator.findOne({ username: username }, callback);
}

module.exports.getBusinessOperatorById = function(businessOperatorId, callback) {
    BusinessOperator.findById(businessOperatorId, callback);
}

module.exports.getBusinessOperatorByBusinessId = function(businessId, callback) {
    BusinessOperator.findOne({ businessId: businessId }, callback);
}