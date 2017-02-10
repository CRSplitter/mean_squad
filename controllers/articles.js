var fs = require('fs'),
	path = require("path");


module.exports.create = function(request, response){
	response.json(request.body);
};

// rendering the html form for the user to create a new post
module.exports.new = function(request, response){
	var name = 'meniawyy'
	var players = ['lampard', 'drogba', 'terry']

	response.render('../templates/template', {players:players, name:name});
};

