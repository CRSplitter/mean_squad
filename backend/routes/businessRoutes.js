/**
    @description: routes file specific to the business only not other users
    @khattab /@carsoli
*/
var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var userController = require('../controllers/userController');
var businessController = require('../controllers/businessController');
var authMiddleware = require('../middlewares/authMiddleware');
var businessMiddleware = require('../middlewares/businessMiddleware');
var adminMiddleware = require('../middlewares/adminMiddleware');
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');

/**
 * Multer Configurations
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        const buf = crypto.randomBytes(48);
        cb(null, Date.now() + buf.toString('hex') + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
});


/**
 * A POST route responsible for registering a business.
 * @var /business/register POST
 * @name /business/register POST
 * @example The route expects a body Object in the following format
 * {
 *     username: username,
 *     password: password,
 *     confirmPassword: password,
 *     email: email of business,
 *     name: name of business,
 *     description: description,
 *     address: address,
 *     latitude: location latitude,
 *     longitude: location longitude,
 *     contactInfo: contactInfo

 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{ type: error type(String),
 *                msg: error message(String)
 *              }]
 * }
 */
router.post('/register', businessController.addType, userController.register, businessController.create);


/**
 * A GET route responsible for showing a business.
 * @var /business/{username} GET
 * @name /business/{username} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {
 *          business: {
 *              name,
 *              description,
 *              address,
 *              latitude,
 *              longitude,
 *              avgRating,
 *              contactInfo,
 *              user: User
 *          }
 *     },
 *     errors: [Error]
 * }
 */
router.get('/:username', businessController.show);


/**
 * A GET route responsible for viewing all activities belonging to the logged in business
 * @var /business/viewMyActivities GET
 * @name /business/viewMyActivities GET
 * @example The route expects a logged in user of type Business
 * @example The route expects a logged in user with the type of Business
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.get('/viewMyActivities', authMiddleware, businessController.addBusiness, businessMiddleware, businessController.viewMyActivities);


/**
 * A POST route responsible for adding a new activity
 * @var /business/addActivity POST
 * @name /business/addActivity POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *   name: Activity title(String),
 *   description: Activity description(String),
 *   price: Activity price(Number),
 *   maxParticipants: Activity max participants(Number),
 *   minParticipants: Activity min participants(Number),
 *   minAge: Activity min age(Number),
 *   durationHours: Activity duration in hours(Number),
 *   durationMinutes: Activity duration in minutes(Number),
 *   images: Activity images(String),
 *   activityType: Activity title(String),
 *   activitySlots: activitySlots Activity title(Day),
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/addActivity', authMiddleware, businessController.addBusiness, businessMiddleware, upload.single('image'), businessController.addActivity);


/**
 * A POST route responsible for adding a timing slot to a specific day belonging to a specific activity
 * @var /business/addTiming POST
 * @name /business/addTiming POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *     dayId: id of the day you wish to add the slot to,
 *     maxParticipants: max number of people reserving at this slot,
 *     time: time in the day of the slot
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/addTiming', authMiddleware, businessController.addBusiness, businessMiddleware, businessController.addTiming);


/**
 * A POST route responsible for removing a timing slot to a specific day belonging to a specific activity
 * @var /business/addTiming POST
 * @name /business/addTiming POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *     dayId: id of the day you wish to remove the slot to,
 *     slotId: id of the slot the business wishes to remove
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/removeTiming', businessController.removeTiming);

/**
 * A POST route responsible for removing an activity belonging to logged in business
 * @var /business/removeActivity POST
 * @name /business/removeActivity POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *     activityId: id of the activity to be deleted
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/removeActivity', authMiddleware, businessController.addBusiness, businessMiddleware, businessController.removeActivity);


/**
 * A POST route responsible for updating an activity
 * @var /business/editActivity POST
 * @name /business/editActivity POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *             name: Activity title(String),
 *             description: Activity description(String),
 *             price: Activity price(Number),
 *             maxParticipants: Activity max participants(Number),
 *             minParticipants: Activity min participants(Number),
 *             minAge: Activity min age(Number),
 *             durationHours: Activity duration in hours(Number),
 *             durationMinutes: Activity duration in minutes(Number),
 *             avgRating: Activity average rating(Number),
 *             images: Activity images(String),
 *             activityType: Activity title(String),
 *             activitySlots: activitySlots Activity title(Day),
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/editActivity', authMiddleware, businessController.addBusiness, businessMiddleware, businessController.editActivity);


/**
 * A GET route responsible for viewing all promotions belonging to logged in business
 * @var /business/viewMyPromotions GET
 * @name /business/viewMyPromotions GET
 * @example The route expects a logged in user of type Business
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.get('/viewMyPromotions', authMiddleware, businessController.addBusiness, businessMiddleware, businessController.viewMyPromotions);


/**
 * A POST route responsible for updating a business profile
 * @var /business/edit POST
 * @name /business/edit POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *     businesId,
 *     name,
 *     description,
 *     address,
 *     longitude,
 *     latitude,
 *     contactInfo
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/edit', authMiddleware, businessMiddleware, businessController.update);


/**
 * A POST route responsible for creating a promotion belonging to a certain activity
 * @var /business/createPromotion POST
 * @name /business/createPromotion POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *     discountValue,
 *     details,
 *     image
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/createPromotion', authMiddleware, businessController.addBusiness, businessMiddleware, upload.single('image'), businessController.createPromotion);


/**
 * A POST route responsible for editing a promotion
 * @var /business/editPromotion POST
 * @name /business/editPromotion POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *     promotionId,
 *     discountValue,
 *     details,
 *     image
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/editPromotion', authMiddleware, businessController.addBusiness, businessMiddleware, upload.single('image'),businessController.editPromotion);


/**
 * A POST route responsible for deleting a promotion
 * @var /business/removePromotion POST
 * @name /business/removePromotion POST
 * @example The route expects a logged in user of type Business
 * @example The route expects a body Object in the following format
 * {
 *     promotionId
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/removePromotion', authMiddleware, businessController.addBusiness, businessMiddleware, businessController.removePromotion);


/**
 * A PUT route responsible for approving a business.
 * @var /business/{id}/accept PUT
 * @name /business/{id}/accept PUT
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/:id/accept', authMiddleware, adminMiddleware, adminController.accept);


/**
 * A PUT route responsible for rejecting a business.
 * @var /business/{id}/reject PUT
 * @name /business/{id}/reject PUT
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.put('/:id/reject', authMiddleware, adminMiddleware, adminController.reject);

module.exports = router;
