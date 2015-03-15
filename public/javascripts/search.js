// ============
// Search CLASS
// ============
var Search = {
	
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
				uri = updateMockObject;
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
				Result.programmes = response.results;
				if(isTesting)
						MainSite.display(isTesting);
				else
					MainSite.display();
			}
		});
	},

	function updateMockObject(){
		var MockObject;
		$.getJSON(mockConcert, function(data) {
			MockObject = data.contents;
			$.getJSON(mockTV, function(data) {
				$.extend(MockObject, data.contents);
			});
		});
		return MockObject;
	}
}