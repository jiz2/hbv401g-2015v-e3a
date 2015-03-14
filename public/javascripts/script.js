// Initializing Main classes for Meta-Search Engine
$(document).ready(function(){ index.init(); });

// GLOBAL VARIABLES (for testing cache)
var g_res = [];

// ===========
// Index CLASS
// ===========
var index = {

	query: $("#searchInput").val(),
	
	init: function(){
		createRow();
		ajaxTesting();

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

		$("button#moreRows").click(function(){
			createRow();
			outputConcert(g_res);
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
			//$('body' ).animate({"background": "red" }, "fast" );
			ajaxTesting();
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

function outputConcert(res){
	var colImg = $('.col-md-4 img')
	var colH2 = $('.col-md-4 h2');
	var colPDet = $('.col-md-4 p.details');
	for(var i = 0; i < colH2.length; i++){
		colImg.eq(i).attr({
			src: res[i].imageSource,
			alt: 'Pic of' + res[i].eventDateName
		});
		colH2.eq(i).text(res[i].eventDateName);
		colPDet.eq(i).html(
			'Name: \"' 				+ res[i].name
			+ '\"<br>DateOfShow: \"' 		+ res[i].dateOfShow
			+ '\"<br>UserGroupName: \"' 	+ res[i].userGroupName
			+ '\"<br>EventHallName: \"' 	+ res[i].eventHallName + '\".'
		);
	}
}

function ajaxTesting(){
	//Showing off the Ajax power
	$.ajax({
		'url': 'http://apis.is/concerts',
		'type': 'GET',
		'dataType': 'json',
		'success': function(response) {
			console.log(response);
			var res = response.results;
			g_res = res; //temp solution!
			outputConcert(res);
		}
	});
}

function createRow(){
	var nrOfCols = 3;
	var nrOfRows = 2;
	for(var i = 0; i < nrOfRows; i++){
		var diff = g_res.length - $('.concertDisplay .col-md-4').length;
		// Only add more events if they exist in the array
		if(diff < nrOfCols)
			if(g_res.length > 0)
				if(diff === 0)
					return;
				else
					nrOfCols = diff;
		var str = "";
		for(var j = 0; j < nrOfCols; j++){
			str += '<div class="col-xs-12 col-md-4">'
				+'<img class="img-responsive"></img>'
				+'<h2></h2>'
				+'<p class="details"></p>'
				+'<p class="viewMore">'
					+'<a class="btn btn-default" href="#" role="button">'
						+'View details &raquo;'
					+'</a>'
				+'</p>'
			+'</div>';
		}
		$('.concertDisplay button#moreRows').before('<div class="row">'+str+'</div>');
	}
}