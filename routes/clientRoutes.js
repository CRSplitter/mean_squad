var express = require('express');
var router = express.Router();
var passport = require("passport");
var clientController = require('../controllers/clientController');
var authMiddleware = require('../middlewares/authMiddleware');
var clientMiddleware = require('../middlewares/clientMiddleware');
var userController = require('../controllers/userController');
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


// post edit form
/**
* A POST route responsible for TODO
* @var /client/TODO POST
* @name /client/TODO POST
* @example The user requesting the route has to be logged in.
* @example The user requesting the route has to be of type 'Client'.
* @example The route expects a body Object in the following format
* {
*     TODO
* }
* @example The route returns as a response an object in the following format
* {
*     msg: String showing a descriptive text,
*     errors: TODO
* }
*/
router.post('/edit', authMiddleware, clientMiddleware, upload.single('image'), clientController.update);

// POST register client
router.post('/register', clientController.addUserType, userController.register, clientController.register);

// Posting a reservation
router.post('/makeReservation', authMiddleware, clientMiddleware, clientController.getClient, clientController.makeReservation);

// Getting current Reservations
router.get('/viewReservations', authMiddleware, clientMiddleware, clientController.getClient, clientController.viewReservations);

// Cancelling a reservation
router.post('/cancelReservation', authMiddleware, clientMiddleware, clientController.getClient, clientController.cancelReservation);

// GET logged in Client viewing an activity
router.get('/viewActivity/:activityId', clientController.viewActivity);

module.exports = router;
