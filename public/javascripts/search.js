// ============
// Search CLASS
// ============
var search = {
	
	searchQuery: function(query){
		// User must be searching for something
		if(!query || query==="")
			return;
		else
			query = query.trim();

		var category = $('#searchForm .btn').text().trim();
		var uri = "";
		var isTesting = (query === "test");

		if(category === "All") {
			if(isTesting)
				uri = './mockObjects';
			else
				category = "Concert";
		}
		if(category === "Concert") {
			if(isTesting)
				uri = './mockConcert';
			else
				uri = 'http://apis.is/concerts';
		}
		if(category === "TV program") {
			if(isTesting)
				uri = './mockTV';
			else
				uri = 'http://apis.is/tv/ruv';
		}
		if(isTesting) {
			console.log("testing mock object");
		}
		else {
			console.log(
				["Searching for the", category, query+"."].join(' ')
			);
		}
		
		$.ajax({
			'url': uri,
			'type': 'GET',
			'dataType': 'json',
			'success': function(response) {
				result.programmes = response.results;
				if(isTesting)
						index.display(isTesting);
				else
					index.display();
			}
		});
	}
}
