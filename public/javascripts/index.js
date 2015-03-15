// ===========
// Index CLASS
// ===========
var index = {

	query: $("#searchInput").val(),
	
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
			index.query = $("#searchInput").val();
			search.searchQuery(index.query);
		});
		
		$("#signinForm").submit(function(e){
			e.preventDefault();
			query = $("#emailInput").val();
			if(query !== "")
				alert('Your email is: \"' + query + '\".');
		});

		// Display Type Handling
		// =====================
		$("button#moreRows").click(function(){
			index.addRows();
			index.display();
		});
		
		$('#list').click(function(event){
			event.preventDefault();
			$('.concertDisplay .col-xs-12').addClass('list-group-item');
		});
		
		$('#grid').click(function(event){
			event.preventDefault();
			$('.concertDisplay .col-xs-12').removeClass('list-group-item');
		});
		
		// Initialize default results
		this.addRows();
		this.update();
	},
	
	update: function(){
		// Get the newest stuff from both databases and call display
		search.searchQuery();
	},
	
	display: function(test){
		// Display most recent programmes obtained from databases
		if(test){
			var res = result.programmes;
			console.log(res);
			var colImg = $('.col-md-4 img')
			var colH2 = $('.col-md-4 h2');
			var colPDet = $('.col-md-4 p.details');
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
			var res = result.programmes;
			
			var colImg = $('.col-md-4 img')
			var colH2 = $('.col-md-4 h2');
			var colPDet = $('.col-md-4 p.details');
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
	
	sortByTitle: function(){
		// Self-explaining
	},
	
	sortByDate: function(){
		// Self-explaining
	},
	
	addRows: function() {
		// Creates HTML container for programme display
		var nrOfCols = 3; // Default number of columns
		var nrOfRows = 2; // Default number of rows
		
		for(var i = 0; i < nrOfRows; i++){
			// Only add more events if they exist in the array
			var diff = result.programmes.length - $('.concertDisplay .col-md-4').length;
			if(diff < nrOfCols)
				if(result.programmes.length > 0)
					if(diff === 0)
						return;
					else
						nrOfCols = diff;
			
			// Generate corresponding HTML code
			var str = "";
			for(var j = 0; j < nrOfCols; j++){
				str += '<div class="col-xs-12 col-md-4">'
					+'<img class="resultImg img-responsive"></img>'
					+'<h2></h2>'
					+'<p class="details"></p>'
					+'<p class="viewMore">'
						+'<a class="detailsButton btn btn-default" href="#" role="button">'
							+'View details &raquo;'
						+'</a>'
					+'</p>'
				+'</div>';
			}
			
			// Attach the HTML code
			$('.concertDisplay button#moreRows').before('<div class="row">'+str+'</div>');
		}
	}
}

// Initializing Main classes for Meta-Search Engine
$(document).ready(function(){ index.init(); });
