// ============
// Search CLASS
// ============
var search = {
	
	searchQuery: function(query){
		if(query && query === "test"){
			//Showing off the Ajax power
			console.log("testing mock object");
			$.ajax({
				'url': './mockObjects',
				'type': 'GET',
				'dataType': 'json',
				'success': function(response) {
					result.programmes = response.results;
					index.display(query);
				}
			});
		} else if(query && query !== ""){
			// Tell user what has been searched
			console.log('You searched for: \"' + query + '\", while choosing: \"'
				+ $('#searchForm .btn').text().trim() + '\".');

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