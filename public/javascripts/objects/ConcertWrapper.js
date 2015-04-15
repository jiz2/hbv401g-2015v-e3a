// ====================
// ConcertWrapper CLASS
// ====================

var ConcertWrapper = {
	
	availableSeats: [], //5x5 array
	pickedSeats: [],
	cid: 0,
	
	getSeats: function(cid){
		this.cid = cid;
		this.pickedSeats = [];
		// Get Seats
		$.ajax({
			'url': '/book/available',
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
		var cid = ConcertWrapper.cid;
		var seats = ConcertWrapper.pickedSeats;
		// Book Seats
		$.ajax({
			'url': '/book/book',
			'type': 'GET',
			'data': {cid: cid, seats: seats},
			'success': function(response) {
				ConcertWrapper.pickedSeats = [];
				MainSite.displayBnr(response);
			}
		});
	}
}