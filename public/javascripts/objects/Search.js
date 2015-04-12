// ============
// Search CLASS
// ============

var Search = {

	results: [],

	searchQuery: function(query, startDate, endDate){

		var query = query.trim();
		var category = $('#searchForm .btn').text().trim();
		var uri = "";

		switch(category) {
			case "Concert": 
				uri = 'http://apis.is/concerts';
				break;
			case "TV program":
				uri = 'http://apis.is/tv/ruv';
				break;
			default: // default is case All
				uri = '/process'
		}

		console.log(
			["Searching for the category:", category, query+"."].join(' ')
		);
		
		var date = new Date(); // what is this? don't we use startDate/endDate?
		
		// Get results for TV
		$.ajax({
			'url': uri,
			'type': 'GET',
			'data': {title: query, stations: 'ruv', date: '2015-04-12'},
			'dataType': 'json',
			'success': function(response) {
				Search.results[0] = response;
				MainSite.displayResults();
			}
		});
	}
}