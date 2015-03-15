// ============
// Search CLASS
// ============
var search = {
	
	searchQuery: function(query){
		query = query.trim();
		category = $('#searchForm .btn').text().trim();
		if(query && query === "test"){
			//Showing off the Ajax power
			console.log("testing mock object");
			$.ajax({
				'url': './mockObjects',
				'type': 'GET',
				'dataType': 'json',
				'success': function(response) {
					result.programmes = response.results;
					index.display(true);
				}
			});
		} else if(query && query !== ""){
			// Tell user what has been searched
			console.log('You searched for: \"' + query
			     + '\", in category: \"' + category + '\".');

			//Showing off the Ajax power
			$.ajax({
				'url': 'http://apis.is/concerts',
				'type': 'GET',
				'dataType': 'json',
				'success': function(response) {
					result.programmes = response.results;
					index.display();
				}
			});
		} else {
			// Default search
			$.ajax({
				'url': 'http://apis.is/concerts',
				'type': 'GET',
				'dataType': 'json',
				'success': function(response) {
					result.programmes = response.results;
					index.display();
				}
			});
		}
	}
}
