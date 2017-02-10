var express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	articles = require('./controllers/articles');

//CRUD = CREATE READ UPDATE DELETE

/*a post instance
	{
		title: "",
		body: "",
		author: "",
		comments:[]
	}
	
	comment
	{
		name:"",
		text:""
	}
*/


//app.use(logger());

app.use(bodyParser());
app.set('view engine', 'ejs')

var posts = []

var not_implemented = function(request, response){
	response.send(501);
}


//AKA ROUTES

// ARTICLES
app.get('/articles', not_implemented);
app.get('/articles/new', articles.new);
app.get('/article/:article_id', not_implemented);
app.post('/articles', articles.create);
app.put('/article/:article_id', not_implemented);
app.delete('/article/:article_id', not_implemented);

//COMMENTS
app.post('/articles/:article_id/comments', not_implemented);
app.delete('/articles/:article_id/comments/:comment_id', not_implemented);

app.listen(8080);