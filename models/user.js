var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    type:String
});


mongoose.model('User', userSchema);