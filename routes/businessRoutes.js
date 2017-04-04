var express = require('express');
var router = express.Router();
var businessController = require('../controllers/businessController');
var businessMiddleware = require('../middlewares/businessMiddleware');
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
router.post('/createPromotion', authMiddleware, businessMiddleware, upload.single('image'), businessController.createPromotion);

router.put('/editPromotion',authMiddleware, businessMiddleware, upload.single('image'), businessController.editPromotion);

router.delete('/removePromotion', authMiddleware, businessMiddleware, businessController.removePromotion);

module.exports = router;