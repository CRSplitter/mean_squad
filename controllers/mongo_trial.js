// connect to mongo
var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017/example', function(err, db){
	if(err)
		return console.log(err);

	console.log('connected!');
	var collection = db.collection('users');
	collection.insert({name:'meniawy'}, function(err, docs){
		if(err)
			return console.log(err);
		console.log(docs);
	});

	collection.find().toArray(function(err, users){
		if(err)
			return console.log(err);
		console.log(users);

	});
});