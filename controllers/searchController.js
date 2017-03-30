var mongoose = require('mongoose'),
    Reservation = mongoose.model('Reservation');
    Activity = mongoose.model('Activity');
    User = mongoose.model('User');
    BusinessOperator = mongoose.model('BuisnessOperator');
    Business = mongoose.model('Business');
    Payment = mongoose.model('Payment');
    Promotion = mongoose.model('Promotion');
    var ObjectId = require('mongoose').Schema.ObjectId


/*
This fucntion searchs activities by name , description and its business name
@params it take paramter q from the url
@return json {errors: [error]} or [{ActivityObject}]
@fawzy
 */
module.exports.searchActivities = 
function(req, res){
    var q = req.query.q
    Activity.find({$or:[{name:{$regex:String(q),$options:"i"}},{description:{$regex:q,$options:"i"}}] },function(error, activities1){
        if(error){
            if(error.message=="$regex has to be a string"){
                error.message = "Please specify a search Value"
            }
            res.send(JSON.stringify(error)); 
        }else{
            searchActivityByBusiness(req, res, activities1,q)
        }

    })
}


/*
This fucntion searchs businesses by name , description 
@params it take paramter q from the url
@return json {errors: [error]} or [{businessObject}]
@fawzy
 */
module.exports.searchBusiness = 
function(req, res){
    var q = req.query.q
    Business.find({$or:[{name:{$regex:String(q),$options:"i"}},{description:{$regex:q,$options:"i"}}] },function(error, results){
        if(error){
            if(error.message=="$regex has to be a string"){
                error.message = "Please specify a search Value"
            }
            res.send(JSON.stringify(error)); 
        }else{
            res.send(JSON.stringify(results)); 

        }

    })
}


/*
This fucntion takes a list of objects and returns it coresponding list of ids
@params modelArray
@return [idOfObject]
@fawzy
 */
function returnObjectIdsOnly(modelArray){
    var ids = Array()
    for (i = 0; i < modelArray.length; i++) { 
        ids.push(String(modelArray[i]._id))
    }
    return ids
}


/*
This fucntion is a helper for the searchActivities function, it helps it by searching activities by the business name
@params req,res,activities1,q
@return json {errors: [error]} or [{ActivityObject}]
@fawzy
 */
function searchActivityByBusiness(req,res,activities1,q){
    Business.find({name:{$regex:String(q),$options:"i"}},function(error, results){
                if(error){
                    res.send(JSON.stringify(error)); 
                }
                var businessIds = returnObjectIdsOnly(results)
                console.log(businessIds)
                Activity.find(function(error,activities2){
                    var filterArray = filterEntityByBusiness(activities2,businessIds)
                    var finalresult = activities1.concat(filterArray)
                    res.send(JSON.stringify(finalresult)); 
                     
                })
            })
}


/*
This fucntion joins any model with the model business and returns the list values of 
the other model after joining
@params entity -Which is the model values- , businessesId - List of businesses Ids -
@return [modelObject]
@fawzy
 */
function filterEntityByBusiness(entity,businessesId){
    var entityBelongToOperator = Array()
    for (i = 0; i < entity.length; i++) { 
        var entitybusinessId = entity[i].businessId
        if(businessesId.indexOf(String(entitybusinessId))>=0){
            entityBelongToOperator.push(entity[i])
        }
    }

    return entityBelongToOperator
}
