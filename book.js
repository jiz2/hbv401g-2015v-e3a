var db = require("./db.js");


var concertsDB = null;
var seatsDB = null;
var dbReady = false;

//Notkun: book.getAvailableSeats(consertId, callback);
//Fyrir: concertId er gilt Id fyrir ákveðna tónleika
//Eftir: callback(err, resultArray) err eru villuskilaboð ef upp kemur villa, annars tómt;
//			resultArray er boolean fylki með sætunum í salnum
exports.getAvailableSeats = function(concertId, callback)
{
	if (dbReady)
	{
		var hallSize = 5;
		var returnArray = [];
		for (var i = 0; i < hallSize; i++)
		{
			returnArray[i] = [];
			for (var j = 0; j < hallSize; j++)
			{
				returnArray[i][j] = false;
			}
		}
		var seatCount = 0;

		function returnBuilder(callback)
		{
			return function(err, result) {
				if(err) callback(err, '');

				if(result) {
					for (var i = 0; i < result.length; i++)
					{
						if(result[i].available==='1') {
							returnArray[i%hallSize][Math.floor(i/hallSize)] = true;
						}
						seatCount++;
						//console.log(i,seatCount,result.length);
					}
					if(seatCount === result.length) {
						callback('', returnArray);
					}

				} else {
					callback('No concert found by that id', '');
				}
			}
		};


		seatsDB.find({concertid: concertId}, returnBuilder(callback));

	} else
		callback('database not ready!','');
}

function generateBookingNumber()
{
	var refNumLength = 6;
	var characters = '123456789ABCDEFGHIJKLMNOPRSTUVXYZ';
	var refNum = '';
	for (var i = 0; i < refNumLength; i++)
	{
		refNum += characters.charAt(Math.floor(Math.random()*characters.length));
	}
	return refNum;
}
/*
exports.book = function(concertId, seatArr, callback)
{
	callback(generateBookingNumber());
}
*/

// Notkun: book.book(concertId, seatArr, callback)
// Fyrir: concertId er Id fyrir tónleika og seatArr er á forminu [[row,seat],[row,seat]...]
// Eftir: callback(err, bookingNumber) err eru villuskilaboð ef upp kemur villa, annars tómt;
//			bookingNumber er bókunarnúmerið

exports.book = function(concertId, seatArr, callback) {
	//console.log('seatArr', seatArr);
	if(dbReady) {
		concertsDB = db.Concerts;
		seatsDB = db.Seats;
		var bookingNumber = generateBookingNumber();
		var count = 0;
		function bookInDb(callback) {
			return function(err, result) {
				result[0].save({available:  bookingNumber}, function (err) {
					if(err) callback(err,'');
					count++;
					//console.log(count===seatArr.length);
					if(count===seatArr.length){
						callback('', bookingNumber);
					}
				});
			}
		}

		for (var i = 0; i < seatArr.length; i++)
		{
			seatsDB.find({concertid: concertId, rowno: seatArr[i][0], seatno: seatArr[i][1]}, bookInDb(callback));
		}

	} else
		callback('database not ready!','');
}

db.onReady(function() {
		dbReady = true;

		concertsDB = db.Concerts;
		seatsDB = db.Seats;

		//qArr = [[1, 1, 1]
		//		[2, 3, 4]];

		/*exports.getAvailableSeats(2, function(err, results) {
			if(err) console.log(err);
			console.log(results[0].available);
		});*/
	}
);