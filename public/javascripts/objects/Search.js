// ============
// Search CLASS
// ============

var Search = {

	results: [[],[]],
	// results[0] is Concert results
	// results[1] is TV results

	searchQuery: function(query, startDate, endDate){
		var query = query.trim();
		var category = $('#searchForm .btn').text().trim();

		if(category === "All" || category === "Concert")
			Search.searchConcert(query);
		if(category === "All" || category === "TV program")
			Search.searchTV(query);

		console.log(["Searching for", query, "in", category].join(' '));
	},

	searchConcert: function(query){
	
		// Get results for Concerts
		$.ajax({
			'url': 'http://apis.is/concerts',
			'type': 'GET',
			'dataType': 'json',
			'success': function(response) {
				Search.results[0] = response;
				MainSite.displayConcertResults();
			}
		});
	},

	searchTV: function(query){
	
		// Get results for TV
		$.ajax({
			'url': 'http://apis.is/tv/ruv',
			'type': 'GET',
			'dataType': 'json',
			'success': function(response) {
				Search.results[1] = response;
				MainSite.displayTVResults();
			}
		});
	}
}