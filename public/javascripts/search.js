// ============
// Search CLASS
// ============
var search = {
	
	searchQuery: function(query){
		var category = $('#searchForm .btn').text().trim();
		var uri = "";
		var test = false;
		if(query) {
			var query = query.trim();
			if(query === "test") {
				test = true;
			}
		}
		if(category === "All") {
			if(test)
				uri = './mockObjects';
			else
				category = "Concert";
		}
		if(category === "Concert") {
			if(test)
				uri = './mockConcert';
			else
				uri = 'http://apis.is/concerts';
		}
		if(category === "TV program") {
			if(test)
				uri = './mockTV';
			else
				uri = 'http://apis.is/tv/ruv';
		}
		if(test) {
			console.log("testing mock object");
			$.ajax({
				'url': uri,
				'type': 'GET',
				'dataType': 'json',
				'success': function(response) {
					result.programmes = response.results;
					index.display(true);
				}
			});
		}
		else {
			console.log(
				["Searching for the", category, query+"."]
				.join(' ')
			);
			$.ajax({
				'url': uri,
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
