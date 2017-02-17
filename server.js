var express = require('express'),
	app = express(),
	port = 8080,
	bodyParser = require('body-parser'),
	ejsLayouts = require("express-ejs-layouts");
	mongoose = require('mongoose');

// Model we are using to communicate with the DB
require('./models/user')

// converts requests bodys from foo=bar&baz=fluf
// to {foo:'bar', team:''mean_squad}
app.use(bodyParser());	

//static file server directory
app.use(express.static(__dirname + '/public'));	

//set view engine (default is jade), this is used to parse data in the html files
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// Connecting to the mongoDB with the DB 'example'
mongoose.connect('mongodb://localhost/example')

// ROUTES
var routes = require('./routes/routes');
app.use(routes);

app.listen(port);
console.log('sever on port %s',port);