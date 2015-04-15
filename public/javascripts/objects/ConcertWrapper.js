// ====================
// ConcertWrapper CLASS
// ====================

var ConcertWrapper = {
	
	availableSeats: [], //5x5 array
	pickedSeats: [],
	bnr: '',
	cid: 0,
	
	getSeats: function(){
		// Get Seats
		$.ajax({
			'url': '/book/available',
			'type': 'GET',
			'data': {cid: ConcertWrapper.cid},
			'dataType': 'json',
			'success': function(response) {
				console.table(response);
				ConcertWrapper.availableSeats = response;
				MainSite.displaySeats();
			}
		});
	},

	bookSeats: function(){
		var cid = ConcertWrapper.cid;
		var seats = ConcertWrapper.pickedSeats;
		if(seats.length===0) return;
		console.log(cid, seats);
		// Book Seats
		$.ajax({
			'url': '/book/book',
			'type': 'GET',
			'data': {cid: cid, seats: seats},
			'success': function(response) {
				console.log(response);
				ConcertWrapper.bnr = response;
				MainSite.displayBnr();
			}
		});
	}
}