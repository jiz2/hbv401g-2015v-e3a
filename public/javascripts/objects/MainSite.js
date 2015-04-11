// ==============
// MainSite CLASS
// ==============

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
			//$("#searchForm").submit();
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
			this.nrOfRows += 2;
			MainSite.displayResults();
		});
		
		// Display as List
		// ===============
		$('#list').click(function(e){
			e.preventDefault();
			$('.concertDisplay .col-md-4').addClass('list-group-item');
		});
		
		// Display as Grid
		// ===============
		$('#grid').click(function(e){
			e.preventDefault();
			$('.concertDisplay .col-md-4').removeClass('list-group-item');
		});
		
		// Initialize default results
		// Creates HTML container for programme display
		this.nrOfCols = 2; // Default number of columns
		this.nrOfRows = 4; // Default number of rows
		this.listClass = "";
		if($('.concertDisplay .col-md-4').hasClass('list-group-item'))
			this.listClass = " list-group-item"

		//This example shows us which column our view seats button belonged to, when clicked
		$('.showAvailableSeats').click(function(e){
			e.preventDefault();
			var cid = $(this).parent().attr('id');
			ConcertWrapper.getSeats(cid);
		});

		// Get the newest stuff from both databases and call display
		Search.searchQuery("");
	},

	displayResults: function(){
		var res = Search.results;
		var TVres = res[0];
		console.log("TVres: ",TVres);
		var str = "";
		for(var i = 0; i < TVres.length; i++) {
			str += '<tr><td>'
				+TVres[i].startTime
				+'</td><td>'
				+TVres[i].title
				+'</td><td><input type="submit" value="Download" onclick="eventHandler(\''
				+TVres[i].title
				+'\')"></td></tr>';
		}
		$('tbody.TVPROGRAMS').html(str);

		/*
		// Set up result layout
		for(var i = 0; i < this.nrOfRows; i++){
			// Only add more events if they exist in the array
			var diff = TVres.length - $('.concertDisplay .col-md-4').length;
			if(diff < this.nrOfCols)
				if(TVres.length > 0)
					if(diff === 0)
						return;
					else
						this.nrOfCols = diff;
			
			// Generate corresponding HTML code
			var str = "";
			for(var j = 0; j < this.nrOfCols; j++){
				var cid = i*j; //just so we get different numbers, for now
				str += '<div id=\"' + cid + '\" class="col-xs-12 col-md-4' + this.listClass + '">'
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
		
		// Display most recent programmes obtained from databases
		var colImg = $('.col-md-4 img')
		var colH2 = $('.col-md-4 h2');
		var colPDet = $('.col-md-4 p.details');
		for(var i = 0; i < TVres.length; i++){
			colImg.eq(i).attr({
				src: TVres[i].imageSource,
				alt: 'Pic of ' + TVres[i].eventDateName
			});
			colH2.eq(i).text(TVres[i].title);
			colPDet.eq(i).html(
				'Series: \"' + TVres[i].seriesNo + '" Episode: \"' + TVres[i].epNo
				+ '\"<br>Start Time: \"' + TVres[i].startTime
				+ '\"<br>Duration: \"' + TVres[i].duration
				+ '\"<br>Channel: \"' 	+ TVres[i].channel 
				+ '\"<br>Number of Downloads: \"' + TVres[i].downloadNo
				+ '\"<br>Ratings: \"' + TVres[i].avgRatings
				+ '\"Rated by: \"' + TVres[i].ratingNo + '\".'
				+ '\"<br><br>Programme ID: \"' + TVres[i].id
			);
		}
		/*
		for(var i = 0; i < colH2.length; i++){
			colImg.eq(i).attr({
				src: '',//res[i].imageSource,
				alt: 'Pic of '// + res[i].eventDateName
			});
			//colH2.eq(i).text(res[i].eventDateName);
			colPDet.eq(i).html(
				'Name: \"' 				+ res[i].name
				+ '\"<br>DateOfShow: \"' 		+ res[i].dateOfShow
				+ '\"<br>UserGroupName: \"' 	+ res[i].userGroupName
				+ '\"<br>EventHallName: \"' 	+ res[i].eventHallName + '\".'
				
			);
		}
		*/
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

	displayBnr: function(bnr){
	
	},

	sortByName: function(){
	
	},

	sortByDate: function(){
	
	}
}

//$("#downloadButton").click(function(title){
function eventHandler(title){
	//if(!localStorage.count) localStorage.count = 0;
	//else localStorage.count++;
	localStorage.setItem(title, title);
	var db = [];
	for (var key in localStorage) {
		db.push(String(localStorage.getItem(key)));
	};
	$("#dlPanel").html("Þú ert búinn að downloada: <br>"+db.join(', '));
	console.log(localStorage);
//});
};