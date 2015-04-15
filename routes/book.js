var express = require('express');
var router = express.Router();
var book = require('../book');

router.get('/book', function(req, res, next) {
	var cid = req.query['cid'].trim();

	cid = parseInt(cid,10)+1; //their id starts at 1, not 0
	var seats = req.query['seats'];
	console.log("hahaha",1);
	seats = strToArr(seats);

	console.log("Processing Booking:", cid, seats, ". Please be patient!");

	function strToArr(seatsStr){
		console.log('hi');
		if(typeof seatsStr != 'string') return;
		var seats = [];
		for(var i = 0; i<seatsStr.length; i++){
			if(i>0 && seatsStr[i]==='['){
				seats.push([]);
				var number = '';
				for(var j = i+1; j<seatsStr.length; j++){
					var c = seatsStr[j];
					if(c===','){
						var seat = parseInt(number,10);
						seats[seats.length-1].push(seat);
						number = '';
						continue;
					}
					if(c===']') break;
					if(!isNaN(c) && c != ' '){
						number += c;
					}
				}
				var seat = parseInt(number,10);
				seats[seats.length-1].push(seat);
			}
		}
		return seats;
	}

	var doneFetching = function(err,response){
		var results;
		if(err) results = err;
		else results = response;
		results = JSON.stringify(results);
		res.send(results);
	}
	//THIS DOESN'T WORK
	//book = function(concertId, seatArr, callback)
	//seatArr example: [[0,0],[0,1],[1,3]]
	//book.book(cid,seats,doneFetching);
	book.book(1,[[0,0],[0,1],[1,3]],doneFetching);
});

router.get('/available', function(req, res, next) {
	var cid = req.query['cid'].trim();
	console.log("Processing Available:", cid, ". Please be patient!");
	var testCriteria = {cid: cid};

	var doneFetching = function(err, response){
		var results;
		if(err) results = err;
		else results = response;
		results = JSON.stringify(results);
		res.send(results);
	}

	book.getAvailableSeats(cid,doneFetching);
});


module.exports = router;