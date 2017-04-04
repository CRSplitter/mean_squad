var mongoose = require('mongoose');
var	Business = mongoose.model('Business');
var	Activity = mongoose.model('Activity');
var	Promotion = mongoose.model('Promotion');
var businessOperator = require('businessOperatorController');


module.exports.createPromotion = function(req,res){
//should add validation
    Promotion.create(req.body, function(err, promotion){
        if(err){
            res.json(err);
        }
        res.json(promotion);         
    })
}

module.exports.editPromotion = (req, res) => {
//should add validation
    var promotionId = req.body.promotionId;
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
    })



}

module.exports.removePromotion = (req, res) => {
     var promotionId = req.body.promotionId;

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
    });

}