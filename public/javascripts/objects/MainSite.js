// ===========
// MainSite CLASS
// ===========
var MainSite = {
	init: function(){
		// =====================
		// Initialize JavaScript
		// =====================
		
		// Search dropdown button
		// =================
		$(".dropdown-menu li a").click(function(){
			var selText = $(this).text();
			$(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
			$("#searchForm").submit();
		});

		// User text input Handling
		// ========================
		$("#searchForm").submit(function(e){
			e.preventDefault();
			Search.searchQuery($("#searchInput").val());
		});
		
		// Display Type Handling
		// =====================
		$("button#moreRows").click(function(){
			MainSite.addRows();
			MainSite.display();
		});
		
		$('#list').click(function(e){
			e.preventDefault();
			$('.concertDisplay .col-md-4').addClass('list-group-item');
		});
		
		$('#grid').click(function(e){
			e.preventDefault();
			$('.concertDisplay .col-md-4').removeClass('list-group-item');
		});
		
		// Initialize default results
		// Creates HTML container for programme display
		var nrOfCols = 3; // Default number of columns
		var nrOfRows = 2; // Default number of rows
		var listClass = "";
		if($('.concertDisplay .col-md-4').hasClass('list-group-item'))
			listClass = " list-group-item"

		//Should really fix this, way too much code, should implement it in displayResults()
		for(var i = 0; i < nrOfRows; i++){
			// Only add more events if they exist in the array
			var diff = Search.results.programmes.length - $('.concertDisplay .col-md-4').length;
			if(diff < nrOfCols)
				if(Search.results.programmes.length > 0)
					if(diff === 0)
						return;
					else
						nrOfCols = diff;
			
			// Generate corresponding HTML code
			var str = "";
			for(var j = 0; j < nrOfCols; j++){
				var cid = i*j; //just so we get different numbers, for now
				str += '<div id=\"' + cid + '\" class="col-xs-12 col-md-4' + listClass + '">'
					+'<img class="resultImg img-responsive"></img>'
					+'<h2></h2>'
					+'<p class="details"></p>'
					+'<p class="viewMore">'
						+'<a class="showAvailableSeats btn btn-default" href="#" role="button">'
							+'View seats &raquo;'
						+'</a>'
					+'</p>'
				+'</div>';
			}
			
			// Attach the HTML code
			$('.concertDisplay button#moreRows').before('<div class="row">'+str+'</div>');
		}

		//This example shows us which column our view seats button belonged to, when clicked
		$('.showAvailableSeats').click(function(e){
			e.preventDefault();
			var cid = $(this).parent().attr('id');
			ConcertWrapper.getSeats(cid);
		});

		// Get the newest stuff from both databases and call display
		Search.searchQuery("we must find a way to show all results when site loads first time");
	},

	displayResults: function(){
		// Display most recent programmes obtained from databases
		var res = Search.results.programmes;
		console.log(res);
		var colImg = $('.col-md-4 img')
		var colH2 = $('.col-md-4 h2');
		var colPDet = $('.col-md-4 p.details');
		var test = false;
		if(test){
			for(var i = 0; i < res.length; i++){
				colImg.eq(i).attr({
					src: '',
					alt: ''
				});
				colH2.eq(i).text(res[i].title);
				colPDet.eq(i).html(
					'Series: \"' + res[i].seriesNo + '" Episode: \"' + res[i].epNo
					+ '\"<br>Start Time: \"' + res[i].startTime
					+ '\"<br>Duration: \"' + res[i].duration
					+ '\"<br>Channel: \"' 	+ res[i].channel 
					+ '\"<br>Number of Downloads: \"' + res[i].downloadNo
					+ '\"<br>Ratings: \"' + res[i].avgRatings
					+ '\"Rated by: \"' + res[i].ratingNo + '\".'
					+ '\"<br><br>Programme ID: \"' + res[i].id
				);
			}
		} else {
			for(var i = 0; i < colH2.length; i++){
				colImg.eq(i).attr({
					src: res[i].imageSource,
					alt: 'Pic of ' + res[i].eventDateName
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
	},

	displaySeats: function(){
		//Draw a box on the screen with available seats for the user
		//Remember to let them have a booking button, which we can
		// make a handler like this:
		/*
		$('.bookAvailableSeats').click(function(e){
			e.preventDefault();
			var seats = [seats that the user picked];
			ConcertWrapper.bookSeats(seats);
		});
		//Remeber to close the window, maybe error handling
		*/
	},

	displayBnr: function(bnr){},

	sortByName: function(){},

	sortByDate: function(){}
	
}