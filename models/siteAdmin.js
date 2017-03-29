var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var SiteAdminSchema = new Schema({
	name: String,
	profileImage: String
	// userId:
	// 	[
	// 		type: Mongoose.Schema.Types.ObjectId,
	// 		ref: 'User'
	// 	]
});

mongoose.model('SiteAdmin', SiteAdminSchema);
