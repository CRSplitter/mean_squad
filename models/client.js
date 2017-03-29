var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    dateOfBirth: Date,
    fullName: String,
    profileImage: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: "true"
    }
});


mongoose.model('Client', clientSchema);