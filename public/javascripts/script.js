// Initializing Main classes for Meta-Search Engine
$(document).ready(function(){ index.init(); });

// ===========
// Index CLASS
// ===========
var index = {

	query: $("#searchInput").val(),
	
	init: function(){
		// =================
		// Search dropdown button
		// =================
		$(".dropdown-menu li a").click(function(){
			var selText = $(this).text();
			$(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
		});

		// =================
		// User text input HANDLING
		// =================
		$("#searchForm").submit(function(e){
			e.preventDefault();
			query = $("#searchInput").val();
			search.searchQuery(query);
		});
		
		$("#signinForm").submit(function(e){
			e.preventDefault();
			query = $("#emailInput").val();
			if(query !== "")
				alert('Your email is: \"' + query + '\".');
		});
	},
	
	update: function(){
		// Get the newest stuff from both databases and call display
	},
	
	display: function(){
		// Display most recent programmes obtained from databases
	},
	
	sortByTitle: function(){
		// Self-explaining
	},
	
	sortByDate: function(){
		// Self-explaining
	}
}

// ============
// Search CLASS
// ============
var search = {
	
	searchQuery: function(query){
		if(query !== ""){
			// Tell user what has been searched
			console.log('You searched for: \"' + query + '\", while choosing: \"'
				+ $('#searchForm .btn').text().trim() + '\".');

			//Showing off the Ajax power
			$.ajax({
				'url': 'http://apis.is/concerts',
				'type': 'GET',
				'dataType': 'json',
				'success': function(response) {
					var colH2 = $('.col-md-4 h2');
					var colPDet = $('.col-md-4 p.details');
					console.log(response);
					var res = response.results;
					console.log(colPDet);
					for(var i=0;i<colH2.length;i++){
						colH2.eq(i).text(res[i].eventDateName);
						colPDet.eq(i).html(
							'<img src="' + res[i].imageSource
							+ '" alt="' + 'Pic of' + res[i].eventDateName + '">'
							+ '<br>Name: \"' 						+ res[i].name
							+ '\"<br>DateOfShow: \"' 		+ res[i].dateOfShow
							+ '\"<br>UserGroupName: \"' 	+ res[i].userGroupName
							+ '\"<br>EventHallName: \"' 	+ res[i].eventHallName + '\".'
						);
					}
				}
			});
		}
	}
}

// ===============================
// Result CLASS (Constructor Only)
// ===============================
function Result(programmes, dlId, seats, bookNr) {
	// Search results
	if (programmes) this.programmes = programmes;
	
	// A TV download booking ID returned by TV Database Engine
	if (dlId) this.dlId = dlId;
	
	// List of seats available when booking for a Concert
	if (seats) this.seats = seats;
	
	// Booking number of a concert returned by Concert Database Engine
	if (bookNr) this.bookNr = bookNr;
}