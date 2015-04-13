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
		MainSite.nrOfTVRows = 4; // Default number of TV rows
		MainSite.nrOfConcertRows = 4; // Default number of TV rows
			
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
		$(".seatButton").click(function(e){
			e.preventDefault();
			console.log(1);
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
		
		// Handle Display More Concert Results
		// ===========================
		$("button#moreConcertRows").click(function(){
			MainSite.nrOfConcertRows += 4;
			MainSite.displayConcertResults();
		});

		// Handle Display More TV Results
		// ===========================
		$("button#moreTVRows").click(function(){
			MainSite.nrOfTVRows += 4;
			MainSite.displayTVResults();
		});
		
		// Clear Cache
		// ===========
		$(".clearButton").click(function(title){
			localStorage.clear();
			MainSite.loadDownloads();
			$("#dlPanel").append('Nothing yet, make sure you download something!');
			$(".downloadButton").removeClass('btn-warning');
		});

		// Sort by name
		// ===========
		$("th.sortable").click(function(){
			var type = $(this).index();
			var className = $(this).closest('table').attr('id');
			MainSite.sortBy(type,className);
		});
	},

	loadDownloads: function(){
		var db = [];
		for(var key in localStorage) {
			var sel = String(localStorage.getItem(key));
			db.push(sel);
		};
		//console.log(db);
		var str = "You've downloaded: <br>" + db.join('<br>');
		$("#dlPanel").html(str);
	},

	displayResults: function(){		
		// Concert results
		// ===============
		MainSite.displayConcertResults();		
		
		// TV results
		// ===============
		MainSite.displayTVResults();
	},

	displayConcertResults: function(){
		var concertRes = Search.results[0];
		if(!concertRes || concertRes.results){
			$("button#moreConcertRows").hide();
			return;
		}
		// Handle View More Button
		// =======================
		if(concertRes.length <= MainSite.nrOfConcertRows){
			$("button#moreConcertRows").hide();
		} else $("button#moreConcertRows").show();
	},

	displayTVResults: function(){
		// TV results
		// ==========
		var tvRes = Search.results[1];
		//console.log("tvRes: ",tvRes);
		var str = "";
		
		// No results
		if(!tvRes){ 
			$("button#moreTVRows").hide();
			str += '<tr><td>'
				+ '----.--.-- --:--:--'
				+ '</td><td>'
				+ 'No results'
				+ '</td><td></td></tr>';
			$('tbody.TVPROGRAMS').html(str); // Attach the HTML code
			return;
		} else {
			var db = [];
			for(var key in localStorage) {
				db.push(String(localStorage.getItem(key)));
			};
			for(var i = 0; i < tvRes.length; i++) {
				if(i >= MainSite.nrOfTVRows) break;
				var btnCol = '', 
					dOrR = 'Download';
				//console.log(tvRes[i].title,db.indexOf(tvRes[i].title));
				if(db.indexOf(tvRes[i].title)>=0){
					btnCol = 'btn-warning';
					dOrR = 'Remove';
				}
				str += '<tr><td>'
					+ tvRes[i].startTime
					+ '</td><td>'
					+ tvRes[i].title
					+ '</td><td><button class="downloadButton btn btn-primary '
					+ btnCol
					+ '" id="'
					+ tvRes[i].title
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

			// Handle View More Button
			// =======================
			if(!tvRes && tvRes.length <= MainSite.nrOfTVRows){
				$("button#moreTVRows").hide();
			} else $("button#moreTVRows").show();
		}
	},

	displaySeats: function(){
		//Draw a box on the screen with available seats for the user
		//Remember to let them have a booking button, which we can
		// make a handler like this:
		/*
		$('.bookSeats').click(function(e){
			e.preventDefault();
			var seats = [seats that the user picked];
			ConcertWrapper.bookSeats(seats);
		});
		//Remeber to close the window, maybe error handling
		*/
	},

	displayBnr: function(bnr){
	
	},

	sortBy: function(type,className){
		var $tbody = $('table tbody.'+className);
		$tbody.find('tr').sort(function(a,b){
			var typeStr = 'td:eq('+type+')';
			var tda = $(a).find(typeStr).text();
			var tdb = $(b).find(typeStr).text();
			// if a < b return 1, else if a > b return -1, else they are equal - return 0
			return tda > tdb ? 1 : tda < tdb ? -1 : 0;
		}).appendTo($tbody);
	}
}