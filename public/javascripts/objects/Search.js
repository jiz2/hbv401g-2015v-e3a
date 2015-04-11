// ============
// Search CLASS
// ============

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
			case "Concert": 
				uri = 'http://apis.is/concerts';
				break;
			case "TV program":
				uri = 'http://apis.is/tv/ruv';
				break;
			case "All":
			default:
				uri = '/process'
		}

		console.log(
			["Searching for the", category, query+"."].join(' ')
		);
		
		$.ajax({
			'url': uri,
			'type': 'GET',
			'data': {title: query, stations: 'ruv', date: '2015-04-11'},
			'dataType': 'json',
			'success': function(response) {
				//Search.results = response.results;
				//MainSite.displayResults();
				console.log(response);
			}
		});
	}
}