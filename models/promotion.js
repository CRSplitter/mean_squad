var mongoose= require('mongoose');
var Schema = mongoose.Schema; 

var promotionSchema = new Schema({
    id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'      
        }, 
    discountValue: Number, 
    details: String, 
    image: String
})
module.exports("Activity", promotionSchema);