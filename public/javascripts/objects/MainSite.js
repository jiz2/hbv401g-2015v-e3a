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

		// Sort by name
		// ===========
		$("th.sortable").click(function(){
			var name = $(this).index();
			var type = $(this).closest('table').attr('id');
			MainSite.sortBy(name,type);
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
		var res = Search.results;
		
		// TV results
		// ==========
		var TVres = res[0];
		//console.log("TVres: ",TVres);
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
				//console.log(TVres[i].title,db.indexOf(TVres[i].title));
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

	sortBy: function(type,className){
		var $tbody = $('table tbody.'+className);
		$tbody.find('tr').sort(function(a,b){
			var typeStr = 'td:eq('+type+')';
			var tda = $(a).find(typeStr).text();
			var tdb = $(b).find(typeStr).text();
			// if a < b return 1, else if a > b return -1, else they are equal - return 0
			return tda > tdb ? 1 : tda < tdb ? -1 : 0;
		}).appendTo($tbody);
	},

	//We don't really need these...
	sortByName: function(){
	},

	sortByDate: function(){
	}
}