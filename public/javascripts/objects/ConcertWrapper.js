// ====================
// ConcertWrapper CLASS
// ====================

var ConcertWrapper = {
	
	availableSeats: [],
	pickedSeats: [],
	_cid: 0,
	
	getSeats: function(cid){
		this._cid = cid;
		// var uri = '/book'; this need to be the getseats process
		
		// Book Seats Concert
		$.ajax({
			'url': uri,
			'type': 'GET',
			'data': {cid: cid},
			'dataType': 'json',
			'success': function(response) {
				ConcertWrapper.availableSeats = response;
				MainSite.displaySeats();
			}
		});
	},

	bookSeats: function(){
		var cid = this._cid;
		var seats = this.pickedSeats;
		var uri = '/book';
		
		// Book Seats Concert
		$.ajax({
			'url': uri,
			'type': 'GET',
			'data': {cid: cid, seats: seats},
			'dataType': 'json',
			'success': function(response) {
				MainSite.displayBnr(response);
			}
		});
	}
}