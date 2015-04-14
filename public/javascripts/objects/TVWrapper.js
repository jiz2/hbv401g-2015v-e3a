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
				// doesn't doesnt do any callback afaik
				console.log(response);
			}
		});
	}
}