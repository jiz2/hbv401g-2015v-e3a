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
		//"2015-04-17T20:30:00"
		var date = new Date($('#advancedSearch #date').val());
		var thisMonth = ""+(date.getMonth()+1);
		if(thisMonth.length===1)
			thisMonth = '0'+thisMonth;
		date = date.getFullYear() + '-' + thisMonth;
		// Get results for Concerts
		$.ajax({
			'url': '/processConcert',
			'type': 'GET',
			'data': {term: query, date: date},
			'dataType': 'json',
			'success': function(response) {
				if(response==="Database not started"){
					Search.searchConcert(query);
					return;
				}
				Search.results[0] = response;
				MainSite.displayConcertResults();
			}
		});
	},

	searchTV: function(query){
		var station = $('#advancedSearch #stations option:selected').val();
		var date = new Date($('#advancedSearch #date').val());
		// Get results for TV
		$.ajax({
			'url': '/processTV',
			'type': 'GET',
			'data': {title: query, stations: station, date: date},
			'dataType': 'json',
			'success': function(response) {
				Search.results[1] = response;
				MainSite.displayTVResults();
			}
		});
	}
}