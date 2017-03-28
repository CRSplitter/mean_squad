var mongoose = require('mongoose');
require('mongoose-type-email');

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
	logo: {
		type: String
	},
	avgRating: {
		type: Number
	},
	contactInfo: {
		type: String
	},
	operators: [
		{
			type: Schema.Types.ObjectId,
			ref: 'BusinessOperator'
		}
	]
});

var Buisness = module.exports = mongoose.model('Buisness', businessSchema);

module.exports.createBusiness = function(newBusiness, callback) {
	newBusiness.save(callback);
}

module.exports.getBusinessByName = function(name, callback) {
	Business.findOne({name: name}, callback);
}

module.exports.getBusinessById = function(businessId, callback) {
	Business.findById(businessId, callback);
}

module.exports.getBusinessesByAvgRating = function(avgRating, callback) {
	Business.find(avgRating, callback);
}

