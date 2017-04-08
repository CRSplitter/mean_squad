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


// registers a business user
router.post('/register', businessController.addType, userController.register, businessController.create);

// retrieve a summary of Activities offered by this business
router.get('/viewMyActivities', authMiddleware, businessController.addBusiness, businessMiddleware , businessController.viewMyActivities);

// post a form with all required Activity details
router.post('/addActivity', authMiddleware ,businessController.addBusiness, businessMiddleware, upload.single('image'),  businessController.addActivity);

// request the deletion of a selected activity that belongs to the busienss
router.post('/removeActivity', authMiddleware , businessController.addBusiness, businessMiddleware,  businessController.removeActivity);

/// POST a form with the updated && old info for an activity
router.post('/editActivity', authMiddleware , businessController.addBusiness, businessMiddleware, businessController.editActivity);

// request a summary of promotions offered by this business
router.get('/viewMyPromotions', authMiddleware ,businessController.addBusiness, businessMiddleware, businessController.viewMyPromotions);

// POST edit form
router.post('/edit', authMiddleware, businessMiddleware, businessController.update);

// POST create a promotion
router.post('/createPromotion', authMiddleware, businessController.addBusiness, businessMiddleware, upload.single('image'), businessController.createPromotion);

// POST edit a promotion
router.post('/editPromotion', authMiddleware,  businessController.addBusiness, businessMiddleware, businessController.editPromotion);

// POST delete a promotion
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
*     errors: TODO
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
*     errors: TODO
* }
*/
router.put('/:id/reject', authMiddleware, adminMiddleware, adminController.reject);

module.exports = router;
