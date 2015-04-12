// ==============
// MainSite CLASS
// ==============

var MainSite = {
	
	init: function(){
		
		// ======================
		// Initialize Site Layout
		// ======================
		
		// Initialize default results
		// Creates HTML container for programme display
		MainSite.nrOfCols = 2; // Default number of columns
		MainSite.nrOfRows = 4; // Default number of rows
		MainSite.listClass = "";
		if($('.concertDisplay .col-md-4').hasClass('list-group-item'))
			MainSite.listClass = " list-group-item"
			
		// Get the newest stuff from both databases and call display
		Search.searchQuery("");
		MainSite.loadDownloads();
		
		// =================
		// Initialize Events
		// =================
		
		// User text input Handling
		// ========================
		$("#searchForm").submit(function(e){
			e.preventDefault();
			Search.searchQuery($("#searchInput").val());
		});
		
		// View Seats for Concerts
		// =======================
		$(".showAvailableSeats").click(function(e){
			e.preventDefault();
			var cid = $(this).parent().attr('id');
			ConcertWrapper.getSeats(cid);
		});
		
		// Search dropdown button
		// =================
		$(".dropdown-menu li a").click(function(){
			var selText = $(this).text();
			$(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
			//$("#searchForm").submit();
		});
		
		// Handle Display More Results
		// ===========================
		$("button#moreRows").click(function(){
			MainSite.nrOfRows += 4;
			MainSite.displayResults();
		});

		// Clear Cache
		// ===========
		$(".clearButton").click(function(title){
			localStorage.clear();
			MainSite.loadDownloads();
			$("#dlPanel").append('Nothing yet, make sure you download something!');
			$(".downloadButton").removeClass('btn-warning');
		});
	},

	loadDownloads: function(){
		var db = [];
		for(var key in localStorage) {
			var sel = String(localStorage.getItem(key));
			db.push(sel);
		};
		console.log(db);
		var str = "You've downloaded: <br>" + db.join('<br>');
		$("#dlPanel").html(str);
	},

	displayResults: function(){
		var res = Search.results;
		
		// TV results
		// ==========
		var TVres = res[0];
		console.log("TVres: ",TVres);
		var str = "";
		
		// No results
		if(TVres.length === 0){ 
			
			str += '<tr><td>'
				+ '----.--.-- --:--:--'
				+ '</td><td>'
				+ 'No results'
				+ '</td><td></td></tr>';
			$('tbody.TVPROGRAMS').html(str); // Attach the HTML code
			
		} else {
			var db = [];
			for(var key in localStorage) {
				db.push(String(localStorage.getItem(key)));
			};
			for(var i = 0; i < TVres.length; i++) {
				if(i >= MainSite.nrOfRows) break;
				var btnCol = '', 
					dOrR = 'Download';
				console.log(TVres[i].title,db.indexOf(TVres[i].title));
				if(db.indexOf(TVres[i].title)>=0){
					btnCol = 'warning';
					dOrR = 'Remove';
				}
				str += '<tr><td>'
					+ TVres[i].startTime
					+ '</td><td>'
					+ TVres[i].title
					+ '</td><td><button class="downloadButton btn btn-primary btn-'
					+ btnCol
					+ '" id="'
					+ TVres[i].title
					+ '" type="submit" value="'
					+ dOrR
					+'"><span class="glyphicon glyphicon-download-alt"></span></td></tr>';
			}
			$('tbody.TVPROGRAMS').html(str); // Attach the HTML code
			// Attach Book A Download Event Handler
			$(".downloadButton").click(function(){
				var title = $(this).attr('id');
				if($(this).attr('value') === "Download"){
					$(this).attr("value", "Remove");
					localStorage.setItem(title, title);
				}
				else {
					$(this).attr("value", "Download");
					localStorage.removeItem(title);
				}
				$(this).toggleClass('btn-warning');
				MainSite.loadDownloads();
			});
		}
		
		
		// Concert results
		// ===============
		
		
		// Handle View More Button
		// =======================
		if(TVres.length <= MainSite.nrOfRows){
			$("button#moreRows").hide();
		} else $("button#moreRows").show();
		
		/*
		// Set up result layout
		for(var i = 0; i < MainSite.nrOfRows; i++){
			// Only add more events if they exist in the array
			var diff = TVres.length - $('.concertDisplay .col-md-4').length;
			if(diff < MainSite.nrOfCols)
				if(TVres.length > 0)
					if(diff === 0)
						return;
					else
						MainSite.nrOfCols = diff;
			
			// Generate corresponding HTML code
			var str = "";
			for(var j = 0; j < MainSite.nrOfCols; j++){
				var cid = i*j; //just so we get different numbers, for now
				str += '<div id=\"' + cid + '\" class="col-xs-12 col-md-4' + MainSite.listClass + '">'
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