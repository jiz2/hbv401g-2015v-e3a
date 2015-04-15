// ====================
// ConcertWrapper CLASS
// ====================

var ConcertWrapper = {
	
	availableSeats: [], //5x5 array
	pickedSeats: [],
	cid: undefined,
	
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
		Console.log("Previously the cid was: " + ConcertWrapper.cid + ". Now it is " + this.cid);
		var seats = ConcertWrapper.pickedSeats;
		// Book Seats
		$.ajax({
			'url': '/book/book',
			'type': 'GET',
			'data': {cid: this.cid, seats: seats},
			'success': function(response) {
				ConcertWrapper.pickedSeats = [];
				MainSite.displayBnr(response);
			}
		});
	}
}
