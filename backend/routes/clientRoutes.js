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
var paymentController = require('../controllers/paymentController');

/**
 * Multer Configurations
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
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

/**
 * A POST route responsible for registering a Client
 * @var /client/regsiter POST
 * @name /client/register POST
 * @example The route expects a body Object in the following format
 * {
 *     username: username of the user,
 *     password: password,
 *     confirmPassword: password confirmed,
 *     email: valid email of the client,
 *     dateOfBirth: date of birth of the client,
 *     
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String(Success Message),
 *     data: {client: clientObject},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/register', clientController.addUserType, userController.register, clientController.register, clientController.requestEmailVerification);

// POST verify Client's email
router.get('/verify/:token', clientController.verifyEmail);

// Posting a reservation
/**
 * A POST route responsible for TODO
 * @var /client/viewReservations POST
 * @name /client/viewReservations POST
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
router.post('/makeReservation', authMiddleware, clientMiddleware, clientController.getClient, clientController.makeReservation);

// Getting current Reservations
/**
 * A GET route responsible for TODO
 * @var /client/viewReservations GET
 * @name /client/viewReservations GET
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
router.get('/viewReservations', authMiddleware, clientMiddleware, clientController.getClient, clientController.viewReservations);

// Cancelling a reservation
/**
 * A POST route responsible for TODO
 * @var /client/cancelReservation POST
 * @name /client/cancelReservation POST
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
router.post('/cancelReservation', authMiddleware, clientMiddleware, clientController.getClient, clientController.cancelReservation);

// GET logged in Client viewing an activity
/**
 * A GET route responsible for TODO
 * @var /client/viewActivity/{activityId} GET
 * @name /client/viewActivity/{activityId} GET
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
router.get('/viewActivity/:activityId', clientController.viewActivity);


/**
 * A POST route responsible for Creating Payment
 * @var /client/charge POST
 * @name /client/charge POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *     reservationId: Id of the reservation paid for,
 *     stripeToken: token sent by stripe,
 *     amount: amount paid
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: TODO
 * }
 */
router.post('/charge', paymentController.charge);


router.get('/charge', (req, res) => {
    res.render("payment");
})
module.exports = router;