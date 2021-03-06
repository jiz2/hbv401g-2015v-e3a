(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// ====================
// ConcertWrapper CLASS
// ====================

var MainSite = require('./MainSite');

var ConcertWrapper = {
	
	seats: [],
	_cid: 0,
	
	getSeats: function(cid){
		_cid = cid;
		//ConcertWrapper.seats = getSeatsFromOtherGroup(cid)
		MainSite.MainSite.displaySeats();
	},

	bookSeats: function(seats){
		/*
		var bnr = 0;
		//handle seat booking
		MainSite.displayBnr(bnr);
		*/
	},
}

exports.ConcertWrapper = ConcertWrapper;
},{"./MainSite":2}],2:[function(require,module,exports){
// ==============
// MainSite CLASS
// ==============

// Imports
var Search = require('./Search');
var TVWrapper = require('./TVWrapper');
var ConcertWrapper = require('./ConcertWrapper');

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
			Search.Search.searchQuery($("#searchInput").val());
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
		this.displayResults();

		//This example shows us which column our view seats button belonged to, when clicked
		$('.showAvailableSeats').click(function(e){
			e.preventDefault();
			var cid = $(this).parent().attr('id');
			ConcertWrapper.ConcertWrapper.getSeats(cid);
		});

		// Get the newest stuff from both databases and call display
		Search.Search.searchQuery("cha");
	},

	displayResults: function(){
		var res = Search.Search.results;
		var TVres = res[0];
		console.log(res);

		/*
		// Set up result layout
		for(var i = 0; i < this.nrOfRows; i++){
			// Only add more events if they exist in the array
			var diff = res.length - $('.concertDisplay .col-md-4').length;
			if(diff < this.nrOfCols)
				if(res.length > 0)
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
		for(var i = 0; i < res.length; i++){
			colImg.eq(i).attr({
				src: res[i].imageSource,
				alt: 'Pic of ' + res[i].eventDateName
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
			ConcertWrapper.ConcertWrapper.bookSeats(seats);
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

exports.MainSite = MainSite;
},{"./ConcertWrapper":1,"./Search":3,"./TVWrapper":4}],3:[function(require,module,exports){
// ============
// Search CLASS
// ============

// Imports
var MainSite = require('./MainSite');

var Search = {

	results: [],

	searchQuery: function(query, startDate, endDate){
		// User must be searching for something
		if(!query || query==="")
			return;
		else
			query = query.trim();

		var category = $('#searchForm .btn').text().trim();
		var uri = "";

		switch(category) {
			case "Concert": 
				uri = 'http://apis.is/concerts';
				break;
			case "TV program":
				uri = 'http://apis.is/tv/ruv';
				break;
			case "All":
			default:
				uri = '/process'
		}

		console.log(
			["Searching for the", category, query+"."].join(' ')
		);
		
		$.ajax({
			'url': uri,
			'type': 'GET',
			'data': {title: query, stations: 'ruv', date: '2015-04-11'},
			'dataType': 'json',
			'success': function(response) {
				//Search.results = response.results;
				//MainSite.MainSite.displayResults();
				console.log("BLABLA",response);
			}
		});
	}
}

exports.Search = Search;
},{"./MainSite":2}],4:[function(require,module,exports){
// ===============
// TVWrapper CLASS
// ===============

var MainSite = require('./MainSite');

var TVWrapper = {

	download: function(id){
	
	}
}

exports.TVWrapper = TVWrapper;
},{"./MainSite":2}],5:[function(require,module,exports){
// Initializing Main classes for Meta-Search Engine
var MainSite = require('./objects/MainSite');

$(document).ready(function(){ MainSite.MainSite.init(); });
},{"./objects/MainSite":2}]},{},[5]);
