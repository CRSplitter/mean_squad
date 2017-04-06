/**
 * @module Business Controller
 * @description The controller that is responsible of handling admin's requests
 */

var mongoose = require('mongoose');
var	Business = mongoose.model('Business');
var	Activity = mongoose.model('Activity');
var	Promotion = mongoose.model('Promotion');
var businessOperator = require('./businessOperatorController');
var userController = require('./userController');
var Strings = require('./helpers/strings');


/**
  A function responsible for creating a new Promotion.
  @param activityId, discountValue, details, req.file
  @ahmaarek
 */
module.exports.createPromotion = function(req,res){
    if (req.file != undefined) 
        req.body.images = req.file.filename;
    Promotion.create(req.body, function(err, promotion){
        if(err){
            res.json(err);
        }
        res.json(promotion);         
    });
}


/**
  A function responsible for editing a Promotion.
  @param promotionId, activityId, discountValue, details
  @ahmaarek
 */
module.exports.editPromotion = (req, res) => {
    var promotionId = req.body.promotionId;
    Promotion.getPromotionById(promotionId, (err, result) =>{
        if(err) {
            return res.json({error: err});
        }
        if(!result) {
            return res.json({error: new Error("No Promotion To Edit")});
        }
        else {
            let editedPromotion = {
                $set:{
                    activityId: req.body.ctivityId,
                    discountValue: req.body.discountValue , 
                    details: req.body.details ,
                    image: req.body.image
                }
            }
            Promotion.updatePromotion(promotionId, editedPromotion, (err, updatedRes)=>{
                if(err) {
                    return res.json(err);
                }
                if(!updatedRes) {
                    return res.json({error: new Error("No Promotion was updated")});
                }
                else {
                    return res.json({message: "Promotion Updated Successfully"}); 
                }
            });   
        }
    });
}


/**
  A function responsible for removing a Promotion.
  @param promotionId
  @ahmaarek
 */
module.exports.removePromotion = (req, res) => {
    var promotionId = req.body.promotionId;
    Promotion.deletePromotion(promotionId, (err, result)=>{
        if(err) {
            return res.json({error: err});
        }
        if(result.nRemoved!="0") {
          res.json({message: "The Promotion was cancelled successfully!", error: "false"});
        } else {
          res.json({message: "The Promotion wasn't cancelled!", error: "true"});
        }
    });
}


/**
  A function responsible for register a new business operator.
  @param email,username, password, confirmPassword
  @carsoli
 */
module.exports.addType = function(req, res, next)
{
  req.body.userType = Strings.BUSINESS;
  next();
}


/**
    a function responsible for creating a new business operator
    this gets called from the User.register
    @param user
    @carsoli
 */
module.exports.create = function(req, res, next)
{
    var user = req.body.newUser;
    var business = new Business(
    {
            userId: user._id,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            contactInfo: req.body.contactInfo
    });
    business.save((err, result)=> {
        if(err) {
            return res.json({error: err}); 
        }

        if(!result) {
            return res.json({message : "Business was not saved"}); 
        }
        else {
            return res.json({message: "Business Saved Successfully"});
        }
    }); 
};


/**
 * @return array of all businesses
 */
module.exports.viewBusinesses =
    function (req, res) {

        Business.find().exec((err, businesses) => {
            if (err) {
                return res.json({
                    error: "Error"
                });
            }
            res.json({
                businesses,
                message: "Success"
            });
        });
    }


/**
 * Update Business's info 
 * @param {String} address
 * @param {String} description
 * @param {String} longitude
 * @param {String} latitude
 * @param {String} contactInfo
 * @param {String} name
 * @param {String} email
 * @return {json} error or message, user
 * @IOElgohary
 */
module.exports.update = [
    function (req, res, next) {


        /* var newbusiness = {
             userId: req.user._id,
             name: "testing",
         };

         Business.create(newbusiness, () => {*/

        // Validation
        req.checkBody('name', 'Name is required').notEmpty();
        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                error: errors
            });
        }

        var query = {
            userId: req.user._id
        };

        var newData = {
            // Update
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            contactInfo: req.body.contactInfo
        }

        Business.update(query, newData, (err, updated) => {
            if (err) {
                return res.json({
                    error: err.message
                });
            }

        });
        // });

        next();

    },
    userController.update

]


/** 
    @description: queries on the userId passed in the body and returns it /    appends businessId in the body 
    @param req,res 
    @returns void
    @carsoli
*/
module.exports.addBusiness = function(req, res,next) 
{
        var userId = req.user._id; 
        Business.findOne({userId: userId},(err, result)=> {
            if(err || !(result)) {
                return res.json({error: err});
            }
            req.body.business = result; 
            next();
        });
} 


/*
    returns an array of the activities for that business or an err message if none exist
	@params req, res, next 
	@return json {success: bool, message: string} or object resulting from query 
	@carsoli
*/
module.exports.viewMyActivities = (req,res) =>{  
    var businessId= req.body.business._id; 
        Activity.getActivityByBusinessId(businessId, (err, result)=>{
            if(err) {
                return res.json({error: err});
            }
            if(!result) {
                return res.json({error: "No Activties For your business"});
            }
            else {
                return res.json(result);
            }
        });
}


/**
    @description: adds an activity to the Activity model using the business' id
	@param: req, res, next 
	@return json {message: string}
	@carsoli
*/
module.exports.addActivity = (req,res)=> {
    var businessId= req.body.business._id; 
    if (req.file != undefined) 
        req.body.image = req.file.filename;

    let newActivity = {
                businessId: businessId,
                name: req.body.name ,
                description: req.body.description , 
                price: req.body.price ,
                maxParticipants: req.body.maxParticipants ,
                minParticipants: req.body.minParticipants ,
                minAge: req.body.minAge, 
                durationHours: req.body.durationHours ,
                durationMinutes: req.body.durationMinutes ,
                avgRating: req.body.avgRating, 
                images: [req.body.image],
                activityType: req.body.activityType
            }

    Activity.createActivity(newActivity,(err, result)=> {
        if(err) {
            return res.json({error: err});
        }
        if(!result) {
            return res.json({error: "No activity was added"});
        }
        else {
            return res.json({message: "Activity Added Successfully"}); 
        }
    });    
 }
 

/**
    @description: removes *one* specified activity that belongs to the business completely from the db
	@param: req, res, next 
	@return json {message: string}
	@carsoli
*/
module.exports.removeActivity = (req,res) =>{
    let activityId = req.body.activityId; //passed from frontend (when pressing a button)
    let businessId= req.body.business._id; 
    
    Activity.getActivityById(activityId, (err, result)=> 
        {
            if(err) {
                return res.json({error: err});
            }
            if(!result) {
                return res.json({error:"No Activity Object Retrieved"});
            }
            
            if(businessId == result.businessId.toString()){
                Activity.deleteActivity(activityId, (delErr, delResult)=>{
                    if(delErr) {
                        return res.json({error: delErr});
                    }
                    return res.json({success: true, message: "Activity Removed Successfully"});     
                });
            } else {
                return res.json({
                    success: false, 
                    message: "Not authorized to Perform this deletion",
                })
            }
            
        });
}


/** 
    @description updates the details of *one* activity that belongs to the business
	@param req, res, next 
	@return json {success: bool, message: string}
	@carsoli
*/
module.exports.editActivity = (req,res) => {
    let activityId = req.body.activityId;
    let businessId= req.body.business._id; 

    Activity.getActivityById(activityId, (err, result)=> {
            if(err) {
                return res.json({error: err});
            }
            if(!result) {
                return res.json({error: "No Activity To Edit"});
            }
            else {
                if(businessId == result.businessId.toString())
                {
                    //edit this to be a set query 
                    let editedActivity = 
                    {
                        $set:{
                            name: req.body.name ,
                            description: req.body.description , 
                            price: req.body.price ,
                            maxParticipants: req.body.maxParticipants ,
                            minParticipants: req.body.minParticipants ,
                            minAge: req.body.minAge, 
                            durationHours: req.body.durationHours ,
                            durationMinutes: req.body.durationMinutes ,
                            activityType: req.body.activityType 
                        }
                    }
                
                    Activity.updateActivity(activityId, editedActivity, (updatedErr, updatedRes)=>
                    {
                        if(updatedErr) {
                            return res.json({error: updatedErr});
                        }
                        if(!updatedRes) {
                            return res.json({error: "No Activity was updated"});
                        }
                        else {
                            return res.json({message: "Activity Updated Successfully"}); 
                        }
                    });
                }
                else {
                    return res.json({message: "Not authorized to Update this Activity"});
                }
            }
        });

}


/**
    @description views a list of Promotions offered by the business
	@param req, res, next 
	@return json {success: bool, message: string} or object resulting from query 
	@carsoli
*/
module.exports.viewMyPromotions= (req, res) => {
    var output =[]; 
    var businessId= req.body.business._id; 
    
    Activity.getActivityByBusinessId(businessId, (err, activityList)=>
    {
        if(err) {
            return res.json({error: err});
        }
        if(!activityList) {
            return res.json({message: "No Activities Available"});
        }
        else {
            console.log(activityList);
            var i =0;
            activityList.forEach((activity)=>
            {
                Promotion.getPromotionByActivityId(activity._id, (promotionArrErr, promotionArrRes) => {
                    if(promotionArrErr) {
                        return res.json({error: promotionArrErr});
                    }
                    if(promotionArrRes.length != 0) {
                        var j=0;
                        promotionArrRes.forEach((promotion) => {
                        Promotion.findById(promotion, (promotionErr, promotionRes)=>{
                                j++;
                               if(promotionErr) {
                                   return res.json("error: " + promotionErr);
                               }
                               else {
                                    if(j>=promotionArrRes.length) {        
                                        i++;
                                       if(i>=activityList.length) {
                                            return res.json(output); 
                                        }    
                                    }   
                               }
                            });
                        });
                    }
                 
                }); 
            });
        }
    });
   }

/**
 * A function responsible for deleting a business.
 * @params id
 * @khattab
 */
module.exports.delete = function(req, res, next)
{
  req.checkParams('id', 'required').notEmpty();

  Business.findById(req.params.id).then(function(business)
{
    if(business)
    {
      business.remove().then(function()
      {
        res.status(200).json
        ({
          status: 'succeeded',
          message: 'Business was successfully deleted'
        });

        next();
      }).catch(function(err)
      {
        res.status(500).json
        ({
          status:'failed',
          message: 'Internal server error'
        });

        next();
      });
    }
    else
    {
      res.status(404).json
      ({
        status:'failed',
        message: 'Business was not found'
      });

      next();
    }
  }).catch(function(err)
  {
    res.status(500).json
    ({
      status:'failed',
      message: 'Internal server error'
    });

    next();
  });
};