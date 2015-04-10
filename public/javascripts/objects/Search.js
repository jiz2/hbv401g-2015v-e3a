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
		var uri = "";

		switch(category) {
			case "All":
			case "Concert": 
				uri = 'http://apis.is/concerts';
				break;
			case "TV program":
				uri = 'http://apis.is/tv/ruv';
				break;
			default:
				uri = 'http://apis.is/concerts';
		}

		console.log(
			["Searching for the", category, query+"."].join(' ')
		);
		
		$.ajax({
			'url': uri,
			'type': 'GET',
			'dataType': 'json',
			'success': function(response) {
				Search.results = response.results;
				MainSite.MainSite.displayResults();
			}
		});
	}
}

exports.Search = Search;