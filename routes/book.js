var express = require('express');
var router = express.Router();
var book = require('../book');

router.get('/book', function(req, res, next) {
	/*var term = req.query['term'];
	var date = req.query['date'];
	console.log("Processing Concert search:", term,date, ". Please be patient!");
	var testCriteria = {term: term, date: date};
	*/
	var doneFetching = function(bookingNumber){
		var results = bookingNumber;
		results = JSON.stringify(results);
		res.send(results);
	}
	//book = function(concertId, seatArr, callback)
	book.book('','',doneFetching);
});

router.get('/available', function(req, res, next) {
	/*var term = req.query['term'];
	var date = req.query['date'];
	console.log("Processing Concert search:", term,date, ". Please be patient!");
	var testCriteria = {term: term, date: date};
	*/
	var doneFetching = function(err, response){
		console.log("IT WORKS");
		var results;
		if(err) results = err;
		else results = response[0].available;
		results = JSON.stringify(results);
		res.send(results);
	}

	book.getAvailableSeats(2,doneFetching);
});


module.exports = router;