// ====================
// ConcertWrapper CLASS
// ====================

var ConcertWrapper = {
	
	availableSeats: [],
	pickedSeats: [],
	_cid: 0,
	
	getSeats: function(cid){
		_cid = cid;
		//ConcertWrapper.availableSeats = getSeatsFromOtherGroup(cid)
		MainSite.displaySeats();
	},

	bookSeats: function(){
		/*
		var bnr = 0;
		//handle seat booking
		MainSite.displayBnr(bnr);
		*/
	}
}