var mongoose = require('mongoose');
var	Business = mongoose.model('Business');
var	Activity = mongoose.model('Activity');
var	Promotion = mongoose.model('Promotion');
var businessOperator = require('businessOperatorController');

module.exports.createPromotion = function(req,res){
    Promotion.create(req.body, function(err, promotion){
        if(err){
            res.json(err);
        }
        res.json(promotion);         
    })
}

module.exports.editPromotion() = (req, res) => {
    var promotionId = req.body.promotionId;

    businessOperator.userAuthChecker(req, res, (businessId) =>{
        Promotion.getPromotionById(promotionId, (err, result) =>{
            if(err){
                console.error(err.stack)
                return res.json({error: err});
            }
            if(!result)
            {
                console.log("no promotion exists with that id");
                return res.json({error: new Error("No Promotion To Edit")});
            }
            else{
                if(businessId == result.businessId) {

                    let editedPromotion = 
                    {
                        $set:{
                            activityId: req.body.activityId,
                            discountValue: req.body.discountValue , 
                            details: req.body.details ,
                            image: req.body.image
                        }
                    }

                    Promotion.updatePromotion(promotionId, editedPromotion, (err, updatedRes)=>{
                        if(err)
                        {
                            console.error(err.stack);
                            return res.json(err);
                        }
                        if(!updatedRes){
                            console.log("Promotion not updated");
                            return res.json({error: new Error("No Promotion was updated")});
                        }
                        else 
                        {
                            console.log("Updated Promotion: " + updatedRes);
                            return res.json({message: "Promotion Updated Successfully"}); 
                        }
                    })
                }
                else{
                    console.log("you're not authorized to perform this update");
                    return res.json({message: "Not authorized to Update this Promotion"});
                }
            }
        })


    })
}

module.exports.removePromotion() = (req, res) => {
     var promotionId = req.body.promotionId;
   

 businessOperator.userAuthChecker(req, res, (businessId)=>{
        Promotion.getPromotionById(promotionId, (err, result)=> 
        {
            if(err)
            {
                console.error(err.stack);
                return res.json({error: err});
            }
            if(!result) 
            {
                console.log("no promotion exists with that id");
                return res.json({error: new Error("No Promotion Object Retrieved")});
            }
            else 
            {
                console.log("promotion that matches input promotionId: " + result);
                if(businessId == result.businessId)
                {
                    Promotion.deletePromotion(promotionId, (err, result)=>{
                        if(err)
                        {
                            console.error(err.stack);
                            return res.json({error: err});
                        }

                        console.log("Removed Promotion: " + result);
                        return res.json({success: true, message: "Promotion Removed Successfully"});     
                    });
                }
                else 
                {
                    console.log("user not authorized to perform this deletion");
                    return res.json({success: false, message: "Not authorized to Perform this deletion"});
                }
            }
        });
    });
}