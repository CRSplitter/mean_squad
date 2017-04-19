var express = require('express');
var router = express.Router();
var passport = require("passport");
var clientController = require('../controllers/clientController');
var authMiddleware = require('../middlewares/authMiddleware');
var clientMiddleware = require('../middlewares/clientMiddleware');
var clientVerifiedMiddleware = require('../middlewares/clientVerifiedMiddleware');
var userController = require('../controllers/userController');
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');
var paymentController = require('../controllers/paymentController');
var reservationController = require('../controllers/reservationController');

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


/**
 * A GET route responsible for showing a specific client full details
 * @var /client/{username} GET
 * @name /client/{username} GET
 * @example The user requesting the route has to be logged in.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {client: Client}
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/show/:username', clientController.show);

/**
 * A POST route responsible for editing client info
 * @var /client/edit POST
 * @name /client/edit POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *      dateOfBirth : date of birth of the client
 *      name : Client's name
 *      email : valid email of the client
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/edit', authMiddleware, clientMiddleware, upload.single('image'), clientController.update);

/**
 * A POST route responsible for registering a Client
 * @var /client/regsiter POST
 * @name /client/register POST
 * @example The route expects a body Object in the following format
 * {
 *     username: username of the client,
 *     password: password of the client,
 *     confirmPassword: password confirmation,
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

/**
 * A GET route responsible for verifying Client's email
 * @var /client/verify/{token} GET
 * @name /client/verify/{token} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/verify/:token', clientController.verifyEmail);


/**
 * A POST route responsible for making a reservation
 * @var /client/makeReservation POST
 * @name /client/makeReservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *      dayId: id of the day of the reservation,
 *      slotId: id of the slot in that day,
 *      activityId: id of the activity the user wishes to reserve,
 *      countParticipants: number of participants reserving this activity,
 *      details: details about the reservation,
 *      clientId: id of the client making the reservation
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/makeReservation', authMiddleware, clientMiddleware, clientController.getClient, clientVerifiedMiddleware, clientController.makeReservation);


/**
 * A GET route responsible for viewing reservations belonging to logged in client
 * @var /client/viewReservations GET
 * @name /client/viewReservations GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *      clientId: id of the client to view his reservations
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {reservations: [reservationObject]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/viewReservations', authMiddleware, clientMiddleware, clientController.getClient, clientVerifiedMiddleware, clientController.viewReservations);


/**
 * A POST route responsible for cancelling a client's reservation
 * @var /client/cancelReservation POST
 * @name /client/cancelReservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *      clientId: id of the client cancelling the reservation,
 *      reservationId: id of the reservation the client wants to cancel
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/cancelReservation', authMiddleware, clientMiddleware, clientController.getClient, clientVerifiedMiddleware, clientController.cancelReservation);


/**
 * A GET route responsible for viewing a certain activity with all its available slots

 * @var /client/viewActivity/{activityId} GET
 * @name /client/viewActivity/{activityId} GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *
 * }
 * @example The route returns as a response an object in the following format
 * {
 *      msg: String showing a descriptive text,
 *      data: {activity: activityObject}
 *      errors: [{type: String, msg: String}]
 * }
 */
router.get('/viewActivity/:activityId', clientController.viewActivity);



/**
 * A POST route responsible for getting amount to be paid for a reservation with a promotion
 * @var /client/reservation_amount POST
 * @name /client/reservation_amount POST
 * @example The route expects a body Object in the following format
 * {
 *      reservationId,
 *      promotionId
 * }
 * @example The route returns as a response an object in the following format
 * {
 *      msg: String showing a descriptive text,
 *      data: {amount: amount to be paid}
 *      errors: [{type: String, msg: String}]
 * }
 */
router.post('/reservation_amount', reservationController.getAmount );




/**
 * A POST route responsible for Rating Activities
 * @var /client/rate_activity POST
 * @name /client/rate_activity POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *     activityId: Id of the Activity to be rated,
 *     rating: Rating chosen by the user from 0 to 4 inclusive
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [Error]
 * }
 */
router.post('/rate_activity',authMiddleware, clientMiddleware, clientController.getClient, clientVerifiedMiddleware,clientController.rateActivity);



/**TODO: ADD test Authentication middlewares
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
 *     errors: [Error]
 * }
 */

router.post('/charge', authMiddleware, clientMiddleware, clientController.getClient, clientVerifiedMiddleware, paymentController.charge);


router.get('/charge', (req, res) => {
    res.render("payment");
});

/**
 * A GET route responsible for showing a specific client full details
 * @var /client/{username} GET
 * @name /client/{username} GET
 * @example The user requesting the route has to be logged in.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {client: {
 *          Client,
 *          userId: User
 *        }
 *     }
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/:username', clientController.show);


module.exports = router;
