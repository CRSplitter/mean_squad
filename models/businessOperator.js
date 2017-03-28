var mongoose = require('mongoose');
require('mongoose-type-email');

var businessOperatorSchema = mongoose.Schema({
	name: {
		type: String,
		index: true, 
		unique: true,
		required: true
	},
	username: {
		type: String,
		index: true, 
		unique: true,
		required: true
	},
	password: {
		type: String
	},
	businessId: {
		type: Schema.Types.ObjectId,
		ref: 'Business',
		required: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true
	},
	profileImage: {
		type: String
	}
});

var BuisnessOperator = module.exports = mongoose.model('BuisnessOperator', businessOperatorSchema);

module.exports.createBusinessOperator = function(newBusinessOperator, callback) {
	newBusinessOperator.save(callback);
}

module.exports.getBusinessOperatorByName = function(name, callback) {
	BusinessOperator.findOne({name: name}, callback);
}

module.exports.getBusinessOperatorByUsername = function(username, callback) {
	BusinessOperator.findOne({username: username}, callback);
}

module.exports.getBusinessOperatorById = function(businessOperatorId, callback) {
	BusinessOperator.findById(businessOperatorId, callback);
}

module.exports.getBusinessOperatorByBusinessId = function(businessId, callback) {
	BusinessOperator.findOne({businessId: businessId}, callback);
}


