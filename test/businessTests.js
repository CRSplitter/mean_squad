// var mongoose = require('mongoose');
// var User = mongoose.model('User');
// var	Business = mongoose.model('Business');
// var	Activity = mongoose.model('Activity');
// var	Promotion = mongoose.model('Promotion');
// var businessOperator = mongoose.model('BuisnessOperator');

// var business = require('./controllers/businessController.js'); 

// function testBC(callback) 
//  {
//     var user1 = new User({
//             email: 'carol@gmail.com',
//             username: 'carsoli',
//             password: '1234',
//             name: 'carol',
//             userType: 'business'
//         });
    
//     var user2 = new User({
//             email: 'op1@gmail.com',
//             username: 'op1',
//             password: '1234',
//             name: 'op1name',
//             userType: 'businessOperator'
//         });  
  
//     var user3 = new User({
//             email: 'op2@gmail.com',
//             username: 'op2',
//             password: '1234',
//             name: 'op2name',
//             userType: 'businessOperator'
//         });     
    
//     var op1 = new businessOperator({
//         userId: user2._id, 
//         businessId: user1._id 
//     });

//     var op2 = new businessOperator({
//         userId: user3._id, 
//         businessId: user1._id 
//     });
    
//     var business1 = new Business({
//         name: 'SkiEgypt', 
//         userId: user1._id,
//         description: 'penguin cuddling resort',
//         address: 'Mall of Egypt, October City',
//         avgRating: 3, 
//         operators: [op1,op2]
//         });     

// //CRUD tests    
//     Business.createBusiness(newbusiness,callback); 
//     Business.getBusinessByName(namecallback); 
//     Business.getBusinessById(businessId, callback);
//     Business.getBusinessesByAvgRating(avgRating, callback);  
// //controller tests = require data from the req body
//     BusinessController.viewMyActivities(callback);
//     BusinessController.removeActivity(callback);
//     BusinessController.viewMyPromotions(callback);
// }
