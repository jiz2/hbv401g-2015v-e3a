var express = require('express');
var router = express.Router();
var concert = require('../search');

router.get('/', function(req, res, next) {
	var term = req.query['term'];
	var date = req.query['date'];
	console.log("Processing Concert search:", term,date, ". Please be patient!");
	var testCriteria = {term: term, date: date};

	var doneFetching = function(err, response){
		var results;
		if(err) results = err;
		else results = response;
		results = JSON.stringify(results);
		res.send(results);
	}

	concert.search(testCriteria, doneFetching);
});


module.exports = router;