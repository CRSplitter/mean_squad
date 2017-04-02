var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    discountValue: Number,
    details: String,
    image: String
})

var Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;

/*CRUD*/
module.exports.findPromotionById() = (promotionId, callback) =>
{
    Promotion.findById(promotionId,callback);   
}

module.exports.findPromotionByActivityId() = (activityId, callback) => 
{
    Promotion.find({activityId: activityId}, callback);
}

