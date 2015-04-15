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
		// ===================
		if(category === "All" || category === "Concert"){
			uri = '/processConcert';
			var date = $('#advancedSearch #date').val();
			
			// Get results for Concerts
			$.ajax({
				'url': uri,
				'type': 'GET',
				'data': {term: query, date: date},
				'dataType': 'json',
				'success': function(response) {
					if(response==="Database not started"){
						Search.searchQuery(query);
						return;
					}
					Search.results[0] = response;
					MainSite.displayConcertResults();
				}
			});
		}
		
		// Search for TV programs
		// ======================
		if(category === "All" || category === "TV program"){
			uri = '/processTV';
			var station = $('#advancedSearch #stations option:selected').val();
			var date = $('#advancedSearch #date').val();
			
			// Get results for TV
			$.ajax({
				'url': uri,
				'type': 'GET',
				'data': {title: query, stations: station, date: date},
				'dataType': 'json',
				'success': function(response) {
					Search.results[1] = response;
					MainSite.displayTVResults();
				}
			});
		}

		console.log(["Searching for", query, "in", category].join(' '));
	}
}