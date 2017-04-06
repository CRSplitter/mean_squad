var mongoose = require('mongoose'),
    Reservation = mongoose.model('Reservation'),
    Activity = mongoose.model('Activity'),
    User = mongoose.model('User'),
    BusinessOperator = mongoose.model('BusinessOperator'),
    Business = mongoose.model('Business'),
    Payment = mongoose.model('Payment'),
    Promotion = mongoose.model('Promotion'),
    ObjectId = require('mongoose').Schema.ObjectId,
    strings = require('./helpers/strings');


/*
1.1
This fucntion searches activities by name , description and its business name
@params it take paramter q from the url
@return json {errors: [error]} or [{ActivityObject}]
@fawzy
 */
module.exports.searchActivities =
    function (req, res) {
        var q = req.query.q;
        Activity.find({
            $or: [{
                name: {
                    $regex: String(q),
                    $options: "i"
                }
            }, {
                description: {
                    $regex: q,
                    $options: "i"
                }
            }]
        }, function (error, activities1) {
            if (error) {
                if (error.message == "$regex has to be a string") {
                    return res.json({
                            errors: [{
                                type: 'DATABASE_ERROR',
                                msg: 'Please specify a search Value'
                            }]
                        });
                }
            } else {
                searchActivityByBusiness(req, res, activities1, q);
            }

        })
    }


/*
1.2
This fucntion searchs businesses by name , description 
@params it take paramter q from the url
@return json {errors: [error]} or [{businessObject}]
@fawzy
 */
module.exports.searchBusiness =
    function (req, res) {
        var q = req.query.q;
        Business.find({
            $or: [{
                name: {
                    $regex: String(q),
                    $options: "i"
                }
            }, {
                description: {
                    $regex: q,
                    $options: "i"
                }
            }]
        }, function (error, results) {
            if (error) {

                if (error.message == "$regex has to be a string") {
                    return res.json({
                            errors: [{
                                type: 'DATABASE_ERROR',
                                msg: 'Please specify a search Value'
                            }]
                        });
                }
            } else {
                res.json({
                    msg: 'Search success',
                    data: [{
                        results:results
                    }]
                });
            }

        })
    }


/*
This fucntion takes a list of objects and returns it coresponding list of ids
@params modelArray
@return [idOfObject]
@fawzy
 */
function returnObjectIdsOnly(modelArray) {
    var ids = Array();
    for (i = 0; i < modelArray.length; i++) {
        ids.push(String(modelArray[i]._id));
    }
    return ids;
}


/*
This fucntion is a helper for the searchActivities function, 
it helps it by searching activities by the business name
@params req,res,activities1,q
@return json {errors: [error]} or [{ActivityObject}]
@fawzy
 */
function searchActivityByBusiness(req, res, activities1, q) {

    Business.find({
        name: {
            $regex: String(q),
            $options: "i"
        }
    }, function (error, results) {
        if (error) {
            return res.json({
                    errors: [{
                        type: strings.DATABASE_ERROR,
                        msg: 'Error finding businesses'
                    }]
                });
        }

        var businessIds = returnObjectIdsOnly(results);

        Activity.find(function (error, activities2) {

            var filterArray = filterEntityByBusiness(activities2, businessIds);
            var filterNoDuplicate = removeDuplicateFrom2Arrays(filterArray,activities1)
            var finalresult = activities1.concat(filterNoDuplicate);
            res.json({
                msg: 'Search success',
                data: [{
                    results:finalresult
                }]
            });
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
function filterEntityByBusiness(entity, businessesId) {
    var entityBelongToOperator = Array();
    for (i = 0; i < entity.length; i++) {
        var entitybusinessId = entity[i].businessId;
        if (businessesId.indexOf(String(entitybusinessId)) >= 0) {
            entityBelongToOperator.push(entity[i]);
        }
    }

    return entityBelongToOperator;
}

function removeDuplicateFrom2Arrays(originalArray,compareArray){
    
    var compareArrayId = returnObjectIdsOnly(compareArray)
    var filteredArray = Array()
    for(i = 0 ; i < originalArray.length; i++ ){
        if(compareArrayId.indexOf(String(originalArray[i]._id))==-1){
            filteredArray.push(originalArray[i])
        }
    }
    return filteredArray
}