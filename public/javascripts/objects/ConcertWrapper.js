// ====================
// ConcertWrapper CLASS
// ====================

var MainSite = require('./MainSite');

exports.ConcertWrapper = {
	
	seats: [],
	_cid: 0,
	
	getSeats: function(cid){
		_cid = cid;
		//ConcertWrapper.seats = getSeatsFromOtherGroup(cid)
		MainSite.MainSite.displaySeats();
	},

	bookSeats: function(seats){
		/*
		var bnr = 0;
		//handle seat booking
		MainSite.displayBnr(bnr);
		*/
	},
}