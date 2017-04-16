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
router.get('/:username', clientController.show);


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
 * @var /client/viewReservations POST
 * @name /client/viewReservations POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Client'.
 * @example The route expects a body Object in the following format
 * {
 *      dayId: id of the day of the reservation,
 *      slotId: id of the slot in that day,
 *      activityId: id of the activity the user wishes to reserve,
 *      countParticipants: number of participants reserving this activity,
 *      details: details about the reservation
 *      clientId: id of the client making the reservation
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/makeReservation', authMiddleware, clientMiddleware, clientController.getClient, clientController.makeReservation);


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
router.get('/viewReservations', authMiddleware, clientMiddleware, clientController.getClient, clientController.viewReservations);


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
router.post('/cancelReservation', authMiddleware, clientMiddleware, clientController.getClient, clientController.cancelReservation);


/**
 * A GET route responsible for viewing a certain activity with all its available slots
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

module.exports = router;
