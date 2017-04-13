/**
 *  @mixin Promotion
 *  @property {Numer} discountValue Discount value
 *  @property {String} details Promotion details
 *  @property {String} image Promotion image or banner
 */


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
module.exports.getPromotionById = (promotionId, callback) => {
    Promotion.findById(promotionId, callback);
}

module.exports.getPromotionByActivityId = (activityId, callback) => {
    Promotion.find({
        activityId: activityId
    }, callback);
}

module.exports.updatePromotion = (promotionObjId, editedPromotion, callback) => {
    Promotion.findOneAndUpdate({
        _id: promotionObjId
    }, editedPromotion, {
        upsert: false,
        new: true
    }, callback);
}

module.exports.deletePromotion = (promotionObjId, callback) => {
    Promotion.findOneAndRemove({
        _id: promotionObjId
    }, callback);
}
