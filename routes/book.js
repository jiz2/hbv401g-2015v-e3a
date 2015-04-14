var express = require('express');
var router = express.Router();
var book = require('../book');

router.get('/', function(req, res, next) {
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
	//concert.search(testCriteria, doneFetching);
});


module.exports = router;