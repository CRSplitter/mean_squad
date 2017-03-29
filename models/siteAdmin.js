var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteAdminSchema = new Schema({
    name: String,
    profileImage: String
        // userId:
        // 	[
        // 		type: Mongoose.Schema.Types.ObjectId,
        // 		ref: 'User'
        // 	]
});

var Admin = mongoose.model('SiteAdmin', SiteAdminSchema);
module.exports = Admin;