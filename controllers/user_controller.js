var mongoose = require('mongoose'),
	User = mongoose.model('user');

module.exports.index = [
	function(req,res,next) {
		var name = 'meniawyy';
		var players = ['lampard', 'drogba', 'terry'];
		User.find({}, function(err,users){
			if(err) return next(err);
			res.render('index',{users:users});	
		});
		
	}
];

module.exports.create = [
	function(req,res,next) {
		if("name" in req.body && req.body !== ' ') {
			next();
		} else {
			res.send(400);
		}
	},
	function(req,res,next) {
		User.create(req.body, function(err, user) {
			if(err) return next(err);
			res.redirect('/');
		});
	}

];