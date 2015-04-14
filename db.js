
// Handles connections to the database.
// Defines models.
// Public
// =============================================================================
exports.Concerts = null;
exports.Seats = null;
exports.onReady = null;
// Setup
// =============================================================================
var orm = require('orm');
var db;
var dbURL = 'postgres://asxpfklbktfkgn:i4KR-MrAgZzbgCRc4uj7uN8ZqI@ec2-50-17-181-147.compute-1.amazonaws.com:5432/dcgh0u24tvps9v?ssl=true';

if (!process.env.NODE_ENV) {
	db = orm.connect(dbURL);
} else {
	db = orm.connect(process.env.DATABASE_URL);
}
exports.db = db;
/*db.on('connect', function(err, db){
});*/

exports.onReady = function (callback) {
	//var callback = callback;
	console.log('onReady');

	db.on('connect', function(err, db) {
		if (err) return printError(err);
		setUp(err, db, callback);
	});
};

function setUp(err, db, callback) {
	if (err) return printError(err);
	console.log('Raungefni í gagnagrunni.');
	console.log('Ný tenging hafin, ' + new Date());

	/*****************
	 *               *
	 * MODELS        *
	 *               *
	 *****************/
	var Concerts = db.define('concerts', {
		id: {type: 'number'},
		eventdatename: {type: 'text'},
		name: {type: 'text'},
		dateofshow: {type: 'text'},
		usergroupname: {type: 'text'},
		eventhallname: {type: 'text'},
		imagesource: {type: 'text'},
		price: {type: 'number'}
	});
	var Seats = db.define('seats', {
		concertid:	 {type: 'number'},
		seatno:		 {type: 'number'},
		rowno:		 {type: 'number'},
		available: {type: 'text'}
	});
	/*****************
	 *               *
	 * RELATIONS     *
	 *               *
	 *****************/
	//Seats.hasOne('concertId', Concerts);
	/*****************
	 *               *
	 * CREATE TABLE  *
	 *               *
	 *****************/
	Concerts.sync(function (err) {
		if (err) return printError(err);
	});
	exports.Concerts = Concerts;

	Seats.sync(function (err) {
		if (err) return printError(err);
	});
	exports.Seats = Seats;

	/********************
	 *                  *
	 * PUBLIC METHODS   *
	 *                  *
	 ********************/
	/*exports.pickWord = function (callback) {
		Word.findRandom(function (err, item) {
			if (err) return console.error(err);
			if (item) {
				console.log("Picked a random word: " + item[0].word);
				callback(item[0]);
			} else {
				console.error("Empty word table");
				callback({word: "Empty word table."});
			}
		});
	};*/

	callback();

}

function printError(err){
	console.log(err);
}