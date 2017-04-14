var mongoose = require('mongoose');
var Schema = mongoose.Schema;

invalidTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('InvalidToken', invalidTokenSchema);