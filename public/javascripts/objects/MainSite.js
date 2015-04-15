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
		MainSite.nrOfTVRows = 4; 		// Default number of TV rows
		MainSite.nrOfConcertRows = 4; 	// Default number of Concert rows
		var now = new Date();
		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2);
		var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
		$('#advancedSearch #date').val(today);
			
		// Get the newest stuff from both databases and display
		Search.searchQuery("");
		MainSite.displayDownloads();
		
		
		// =================
		// Initialize Events
		// =================
		
		// User text input Handling
		// ========================
		$("#searchForm").submit(function(e){
			e.preventDefault();
			Search.searchQuery($("#searchInput").val());
		});

		$("#viewSeats .seatBtn").click(function(){
			var row = $(this).parent().parent().index();
			var col = $(this).parent().index()-1;
			//console.log(row, col);
			//Next we can put it in an array which we'll use when user clicks "Book seats"
			$(this).toggleClass('btn-warning').find('span')
				.toggleClass('glyphicon-ok-circle')
				.toggleClass('glyphicon-remove-circle');
			var wasBooking = $(this).find('span').hasClass('glyphicon-remove-circle');
			$('#nrOfSeats').text(function(i, oldval){
				if(wasBooking) 	return ++oldval;
				else 			return --oldval;
			});
			if(wasBooking){
				ConcertWrapper.pickedSeats.push([row,col]);
				//console.table(ConcertWrapper.pickedSeats);
			}
			else {
				var ps = ConcertWrapper.pickedSeats;
				for(var i = 0; i < ps.length; i++){
					if(ps[i][0] === row && ps[i][1] === col){
						ConcertWrapper.pickedSeats.splice(i,1);
						//console.table(ConcertWrapper.pickedSeats);
					}
				}
			}

			$('#bookSeats').attr("disabled", (ConcertWrapper.pickedSeats.length === 0));
		});

		$('#bookSeats').click(function(){
			//console.table(ConcertWrapper.pickedSeats);
			$("#bnr").html("Generating your booking number...");
			$(this).attr("disabled", true);
			ConcertWrapper.bookSeats();
		});
		
		// Handle Search Catergory Dropdown
		// ================================
		$(".dropdown-menu li a").click(function(){
			var selText = $(this).text();
			$(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
			//$("#searchForm").submit(); //Uncomment if you want it to search automatically when category is changed
		});

		$(".searchBtn").click(function(){
			$("#searchForm").submit();
		});
		
		// Handle Display More Concert Results
		// ===================================
		$("button#moreConcertRows").click(function(){
			MainSite.nrOfConcertRows += 4;
			MainSite.displayConcertResults();
		});

		// Handle Display More TV Results
		// ==============================
		$("button#moreTVRows").click(function(){
			MainSite.nrOfTVRows += 4;
			MainSite.displayTVResults();
		});
		
		// Clear Downloads
		// ===============
		$("#clearDownloadsButton").click(function(title){
			localStorage.clear();
			MainSite.displayDownloads();
			$("#dlPanel").append('Nothing yet, make sure you download something!');
			$(".downloadButton").removeClass('btn-warning');
		});

		// Sort by Date and Time / Title
		// =============================
		$("th.sortable").click(function(){
			$(this).parent().children('.sorted').removeClass('sorted');
			$(this).addClass('sorted');
			var type = $(this).index();
			var className = $(this).closest('table').attr('id');
			//console.log(type,className);
			MainSite.sortBy(type,className);
		});
	},

	displayConcertResults: function(){
		
		// Concert results
		// ==========
		var concertRes = Search.results[0];
		var str = "";
		
		// No results
		if(!concertRes){
			$("button#moreConcertRows").hide();
			str += '<tr><td>'
				+ '----.--.-- --:--:--'
				+ '</td><td>'
				+ 'No results'
				+ '</td><td></td></tr>';
			$('tbody.CONCERTPROGRAMS').html(str); // Attach the HTML code
			
		} else { 
			
			// Display Concert results
			for(var i = 0; i < concertRes.length; i++) {
				
				// Early quit if displayed all results
				if(i >= MainSite.nrOfConcertRows) break;

				var title = concertRes[i].eventdatename.slice(0,19);
				if(concertRes[i].eventdatename.length>title.length)
					 title += '...';
				
				str += '<tr><td>'
					+ concertRes[i].dateofshow.split('T').join(' ')
					+ '</td><td>'
					+ title
					+ '</td><td id="'
					+ i
					+ '">'
					+ '<button class="viewSeats btn btn-primary" type="button" data-toggle="modal" data-target="#viewSeats">'
					+ '<span class="glyphicon glyphicon-th"></span></button>'
					+ '</td></tr>';
			}
			$('tbody.CONCERTPROGRAMS').html(str); // Attach the HTML code

			// Attach View Seats Event Handler
			$(".viewSeats").click(function(){
				$("#seatTable").find('td .seatBtn span')
					.removeClass('glyphicon-ban-circle')
					.removeClass('glyphicon-remove-circle')
					.addClass('glyphicon-ok-circle')
					.parent()
						.addClass('brn-primative')
						.removeClass('btn-warning')
						.removeClass('btn-danger')
						.removeClass("active")
						.attr("disabled", false);
				$('#nrOfSeats').text(0);
				ConcertWrapper.pickedSeats = [];
				ConcertWrapper.cid = $(this).parent().attr('id');
				ConcertWrapper.getSeats();
			});
		}

		// Handle View More Button
		// =======================
		if(!concertRes || concertRes.length <= MainSite.nrOfConcertRows){
			$("button#moreConcertRows").addClass('hidden');
		} else $("button#moreConcertRows").removeClass('hidden');

		var $sortable = $('tbody.CONCERTPROGRAMS').parents().find('th.sortable');
		//var $unsorted = $sortable.parent().children(':not(.sorted)');
		var $sorted = $sortable.parent().children('.sorted');
		//console.log($sortable, $unsorted, $sorted);

		var type = $sorted.index();
		var className = "CONCERTPROGRAMS";
		//console.log(type,className);
		MainSite.sortBy(type,className);
	},

	displayTVResults: function(){
		
		// TV results
		// ==========
		var tvRes = Search.results[1];
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
		} else { 
			// Display TV results
			var db = [];
			for(var key in localStorage) {
				db.push(String(localStorage.getItem(key)));
			};
			for(var i = 0; i < tvRes.length; i++) {
				// Early quit if displayed all results
				if(i >= MainSite.nrOfTVRows) break;
				
				// Handle pre-checked downloads
				var btnCol = '', dOrR = 'Download';
				
				if(db.indexOf(tvRes[i].title) >= 0){
					btnCol = 'btn-warning';
					dOrR = 'Remove';
				}
				
				var title = tvRes[i].title.slice(0,19);
				if(tvRes[i].title.length>title.length)
					 title += '...';

				str += '<tr><td>'
					+ tvRes[i].startTime
					+ '</td><td>'
					+ title
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
				//There's nothing happening in the TVWrapper
				//TVWrapper.download(title);//Or something??
				if($(this).attr('value') === "Download"){
					$(this).attr("value", "Remove");
					localStorage.setItem(title, title);
				}
				else {
					$(this).attr("value", "Download");
					localStorage.removeItem(title);
				}
				$(this).toggleClass('btn-warning');
				MainSite.displayDownloads();
			});
		}
		
		// Handle View More Button
		// =======================
		
		if(!tvRes || tvRes.length <= MainSite.nrOfTVRows){
			$("button#moreTVRows").addClass('hidden');
		} else $("button#moreTVRows").removeClass('hidden');

		var $sortable = $('tbody.TVPROGRAMS').parents().find('th.sortable');
		//var $unsorted = $sortable.parent().children(':not(.sorted)');
		var $sorted = $sortable.parent().children('.sorted');
		//console.log($sortable, $unsorted, $sorted);

		var type = $sorted.index();
		var className = "TVPROGRAMS";//$sorted.closest('table').attr('id');
		//console.log(type,className);
		MainSite.sortBy(type,className);
	},

	displayDownloads: function(){
		var db = [];
		for(var key in localStorage) {
			var sel = String(localStorage.getItem(key));
			db.push(sel);
		};
		//console.log(db);
		var str = "You've downloaded: <br>" + db.join('<br>');
		$("#dlPanel").html(str);
	},

	displaySeats: function(){
		//Make seats that are not available red, not clickable and switch the glyphicon to ban-circle
		var aSeats = ConcertWrapper.availableSeats;
		//aSeats[0][0] = true; //For testing, remember to comment out!
		var tbody = $("#seatTable > tr").each(function(){
			var rowNr = $(this).index();
			//console.log("rw",rowNr,$(this));
			$(this).children('td:not(:first-child)').each(function(){
				var colNr = $(this).index()-1;
				//console.log("cl",colNr);
				if(!aSeats[rowNr][colNr]){
					$(this).find('span')
						.removeClass('glyphicon-ok-circle')
						.removeClass('glyphicon-remove-circle')
						.addClass('glyphicon-ban-circle')
						.parent().addClass('btn-danger')
							.attr("disabled", true);
				}
			});
		});
		//Remember to close the window, maybe error handling
	},

	displayBnr: function(){
		var bnr = ConcertWrapper.bnr;

		var tbody = $("#seatTable tr td").find('.glyphicon-remove-circle')
			.removeClass('glyphicon-remove-circle')
			.addClass('glyphicon-ban-circle')
			.parent().addClass('btn-danger')
				.attr("disabled", true);
		$('#nrOfSeats').text(0);
		//Remember: We could store them in a localstorage like we do with the TV downloads
		$("#bPanel p").append(bnr);
		$("#bnr").html("Your booking number is: <br>"+bnr);
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