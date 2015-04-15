var express = require('express');
var router = express.Router();
var book = require('../book');

router.get('/book', function(req, res, next) {
	/*var term = req.query['term'];
	var date = req.query['date'];
	console.log("Processing Concert search:", term,date, ". Please be patient!");
	var testCriteria = {term: term, date: date};
	*/
	var doneFetching = function(err,response){
		var results;
		if(err) results = err;
		else results = response;
		results = JSON.stringify(results);
		res.send(results);
	}
	//THIS DOESN'T WORK
	//book = function(concertId, seatArr, callback)
	book.book(1,[[0,0],[0,1],[1,3]],doneFetching);
});

router.get('/available', function(req, res, next) {
	/*var term = req.query['term'];
	var date = req.query['date'];
	console.log("Processing Concert search:", term,date, ". Please be patient!");
	var testCriteria = {term: term, date: date};
	*/
	var doneFetching = function(err, response){
		var results;
		if(err) results = err;
		else results = response;
		results = JSON.stringify(results);
		res.send(results);
	}

	book.getAvailableSeats(2,doneFetching);
});


module.exports = router;