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
		var uri = "";

		// Search for Concerts
		if(category === "All" || category === "Concert"){
			uri = 'http://apis.is/concerts';

			// Get results for Concerts
			$.ajax({
				'url': uri,
				'type': 'GET',
				//'data': {title: query, stations: 'ruv', date: '2015-04-12'},
				'dataType': 'json',
				'success': function(response) {
					Search.results[0] = response;
					MainSite.displayResults();
				}
			});
		}
		
		// Search for TV programs
		if(category === "All" || category === "TV program"){
			uri = '/process'
			
			var date = new Date(); // what is this? don't we use startDate/endDate?
			
			// Get results for TV
			$.ajax({
				'url': uri,
				'type': 'GET',
				'data': {title: query, stations: 'ruv', date: date},
				'dataType': 'json',
				'success': function(response) {
					Search.results[1] = response;
					MainSite.displayResults();
				}
			});
		}

		console.log(
			["Searching for", query, "in", category].join(' ')
		);
	}
}