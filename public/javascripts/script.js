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
			alert('You searched for: \"' + query + '\", while choosing: \"'
				+ $('#searchForm .btn').text().trim() + '\".');
		}
		
		/* AJAX CODE:
		// We need to be running a server for this to work
		var xmlhttp;
		if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
		else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				$("#output").innerHTML = xmlhttp.responseText;
				alert("You searched for: "+query[0].value+""+$('#searchForm .btn').text());
			}
		}
		xmlhttp.open("POST","phplogic/handleUserInput.php?srch-term="+query.value,true); //this is how it's done in php
		xmlhttp.send();
		*/
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