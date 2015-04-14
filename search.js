var db = require("./db.js");


var concertsDB = null;
var seatsDB = null;
var dbReady = false;

// Notkun: search.search(query, callback)
// Fyrir: query er hlutur sem inniheldur query.term (term er strengur) og query.date (er strengur)
// Eftir: kallað er á callback fallið með fylki sem inniheldur þá concert hluti sem passa við leitina


exports.search = function(query, callback) {
	var searchTerm = "SELECT * FROM concerts WHERE";
	if(dbReady)
	{
		if (query.date)
		{
			searchTerm += " dateofshow LIKE '%"+query.date+"%'";
			if (query.term) searchTerm += " AND (";
		}
		if (query.term)
		{
			searchTerm += " eventhallname LIKE '%"+query.term+"%'";
			searchTerm += " OR name LIKE '%"+query.term+"%'";
			searchTerm += " OR usergroupname LIKE '%"+query.term+"%'";
			searchTerm += " OR eventhallname LIKE '%"+query.term+"%'";
			//if (query.date) searchTerm += " AND"
			if(query.date) searchTerm += ")";
		}
		//console.log(searchTerm);
		db.db.driver.execQuery(searchTerm, callback);
	}
};


db.onReady(function() {
		console.log('calling back');
		dbReady = true;

		concertsDB = db.Concerts;
		seatsDB = db.Seats;

		exports.search({id: 2}, function(err, results) {
			if(err)
				console.log(err);
			else {
				console.log(results);
				//console.log('eventHalName:'+ results[0].eventHallName);
			}
		});

	}
);