var express = require('express'),
	app = express(),
	port = 8080,
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

require('./models/user')			// Model we are using to communicate with the DB

app.use(bodyParser());								// converts requests bodys from foo=bar&baz=fluf
													//to {foo:'bar', team:''mean_squad}	
app.use(express.static(__dirname + '/public'));		//static file server directory
app.set('view engine', 'ejs');                     //set view engine (default is jade)


mongoose.connect('mongodb://localhost/example')
var userController = require('./controllers/user'); //


// ROUTES
app.get('/', userController.index);
app.post('/add', userController.create);


app.listen(port);
console.log('sever on port %s',port);