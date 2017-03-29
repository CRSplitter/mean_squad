var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    ejsLayouts = require("express-ejs-layouts"),
    fileUpload = require('express-fileupload'),
    flash = require('connect-flash'),
    expressValidator = require('express-validator'),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    passport = require("passport"),
    session = require("express-session");


// Model we are using to communicate with the DB
require('./models/promotion');
/*require('./models/user')

require('./models/post')
require('./models/portfolio')
require('./models/facebookUser')*/
require('./models/user')


// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


// Express Session
var session = require('express-session');
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());


//static file server directory
app.use(express.static(__dirname + '/public'));


//set view engine
app.set('view engine', 'ejs');
app.use(ejsLayouts);


// Connecting to the mongoDB with the DB 'guc'
mongoose.connect('mongodb://localhost/guc')


// Set up passport
var setUpPassport = require("./config/setupPassport");
setUpPassport();


// Connect Flash
app.use(flash());


// Global Variables
app.use(function(req, res, next) {
    res.locals.req = req;
    res.locals.res = res;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// ROUTES

var main_routes = require('./routes/main_routes');
var visitorRoutes = require('./routes/visitorRoutes');
/*var user_routes = require('./routes/user');
var student_routes = require('./routes/student');*/

app.use('/', visitorRoutes);
var userRoutes = require('./routes/userRoutes');

// app.use('/', main_routes);
app.use('/user', userRoutes);
/*app.use('/user', user_routes);
app.use('/student', student_routes);*/


// Server init
app.listen(port);
console.log('Sever on port %s', port);