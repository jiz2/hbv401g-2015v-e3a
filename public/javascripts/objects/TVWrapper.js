// ===============
// TVWrapper CLASS
// ===============

var TVWrapper = {

	download: function(id){
		$.ajax({
			'url': '/bookADownload',
			'type': 'GET',
			'data': {id: id},
			'dataType': 'json',
			'success': function(response) {
				//Search.results = response.results;
				//MainSite.displayResults();
				console.log(response);
			}
		});
	}
}