// ============
// Search CLASS
// ============
var MainSite = require('./MainSite');
exports.Search = {

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
			case "TV program":
			default:
				uri = 'http://apis.is/tv/ruv';
		}

		console.log(
			["Searching for the", category, query+"."].join(' ')
		);
		
		/*$.ajax({
			'url': uri,
			'type': 'GET',
			'dataType': 'json',
			'success': function(response) {
				Search.results.programmes = response.results;
				MainSite.MainSite.displayResults();
			}
		});*/
	}
}