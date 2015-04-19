// ====================
// ConcertWrapper CLASS
// ====================

var ConcertWrapper = {
	
	seats: [],
	cid: undefined,
	
	getSeats: function(){
		// Get Seats
		/* $.ajax({
			'url': '',
			'type': 'GET',
			//'data': {cid: ConcertWrapper.cid},
			'dataType': 'json',
			'success': function(response) {
				//console.table(response);
				ConcertWrapper.seats = response;
				MainSite.displaySeats();
			}
		}); */
	},

	bookSeats: function(){
		var cid = ConcertWrapper.cid;
		console.log("Previously the cid was: " + ConcertWrapper.cid + ". Now it is " + this.cid);
		var seats = ConcertWrapper.seats;
		// Book Seats
		/* $.ajax({
			'url': '/book/book',
			'type': 'GET',
			'data': {cid: this.cid, seats: seats},
			'success': function(response) {
				//console.log(response);
				ConcertWrapper.bnr = response;
				MainSite.displayBnr();
			}
		}); */
	}
}
