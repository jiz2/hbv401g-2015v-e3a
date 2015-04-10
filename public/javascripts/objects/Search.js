// ============
// Search CLASS
// ============

// Imports
var MainSite = require('./MainSite');

var Search = {

	results: [],

	searchQuery: function(query, startDate, endDate){
		// User must be searching for something
		if(!query || query==="")
			return;
		else
			query = query.trim();

		var category = $('#searchForm .btn').text().trim();

		// Call search in the search engine of the components
		switch(category) {
			case "Concert": // unknown yet
				// search in concert
				break;
			case "TV program":
				// Search.results = 
				// first require apisMessenger then call queryTV();
				// MainSite.MainSite.displayResults();
				break;
			default: // default is case All
				MainSite.MainSite.displayResults();
		}

		// could put this logger into the event handler of query input (Jianfei)
		console.log(
			["Searching for the", category, query+"."].join(' ')
		);
	}
}

exports.Search = Search;