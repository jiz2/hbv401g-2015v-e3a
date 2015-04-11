// ============
// Search CLASS
// ============

// Imports
var MainSite = require('./MainSite');
var apM = require('../../../apisMessenger');

var Search = {

	results: [],

	searchQuery: function(query, startDate, endDate){
		// User must be searching for something
		if(!query || query==="")
			return;
		else
			query = query.trim();

		var category = $('#searchForm .btn').text().trim();

		// Call search in the search engine of the components
		switch(category) {
<<<<<<< HEAD
			case "Concert": // unknown yet
				// search in concert
				break;
			case "TV program":
				// Search.results = 
				// first require apisMessenger then call queryTV();
				// MainSite.MainSite.displayResults();
				break;
			default: // default is case All
				MainSite.MainSite.displayResults();
=======
			case "Concert": 
				uri = 'http://apis.is/concerts';
				break;
			case "TV program":
				apM.queryTV({title: query, station: 'ruv', date: '2015-04-11'}, function(response){
					//res is an array of javascript objects that represent the shows
					//results is a string that looks like '[{show1}, {show2}, ...etc.]'
					//i.e. a stringified res
					//console.log(res);
					////results = JSON.stringify(res);
					//console.log(results); 
					//In order to render the reponse with your ejs, just change the below
					//to: reponse.render('process', {YOUR OPTIONS HERE})
					//you can use res instead of results if you want to skip parsing it 
					//back into an array:)
					/*
					response.render('process', {
						title: 'Your results!',      
						classname: 'results',
						results: res 
					});
					*/
					Search.results[0] = response;
					return;
				});
				break;
			case "All":
			default:
				uri = 'http://apis.is/tv/ruv';
>>>>>>> origin/master
		}

		// could put this logger into the event handler of query input (Jianfei)
		console.log(
			["Searching for the", category, query+"."].join(' ')
		);
	}
}

exports.Search = Search;