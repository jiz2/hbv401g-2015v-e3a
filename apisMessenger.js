//---------- APISMESSENGER --------------------------
//This calls the apis.is and repopulates the database

//=====================================
//              MODULES
//=====================================

var http = require('http');

//=====================================
//               VARS
//=====================================

var dataArray = [];
var path;
var Gcriteria= "";


//=====================================
//        REQUEST-URL MANAGERS
//=====================================

var endpoints = ["ruv",
        "ruvithrottir",
        "stod2",
        "stod2sport",
        "stod2sport2",
        "stod2gull",
        "stod2bio",
        "stod3",
        "skjar1"];


//=====================================
//        HELPER FUNCTIONS
//=====================================

//USE: options = stationGetter(p);
//PRE: p is a valid endpoint for accessing apis.is
//POST: options is a an object containing URL information
//      for an http request
var stationGetter = function(p){
  var options = {
  host: 'apis.is',
  path: '/tv/'+ p
  };
  return options;
}

//================================
//      MODULE FUNCTIONS
//================================

//USE: fetchCallback(callback);
//PRE: callback is a function
//POST: a new function is returned that
//      processes an http reponse
var fetchCallback = function(callback) {
  return function(response){
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //when the whole response is received we we shall add it to the dataArray
    response.on('end', function () {
      findTitle(Gcriteria, str, callback);
    });
  }    
}

//USE: queryTV(criteria, callback)
//PRE: criteria is an object that contains the keys
//     title, station and date
//     callback is a function
//POST:findTitle has been called
var queryTV = function(criteria, callback) {
  Gcriteria=criteria;
  var currentStation = Gcriteria.station;
  var path = currentStation;
  http.request(stationGetter(path), fetchCallback(callback)).end();
}

//USE: findTitle(criteria, data, callback)
//PRE: criteria is an object that contains the keys
//     title, station and date
//     data is a JSON string
//     callback is a function
//POST: a response is written to the web browser via the callback with
//      the filtered results.
var findTitle = function(criteria, data, callback){
    var results = [];
    var tSearch= (criteria.title !== "");
    var dSearch= (criteria.date !== "");
    console.log(criteria.date);

    if (dSearch) 
      { 
        var searchDate = new Date (criteria.date);
        var searchMonth = searchDate.getMonth();
        var searchDay = searchDate.getDate();
        var searchYear = searchDate.getYear();
        console.log(searchDate);
      }

    //Lets extract the array with the show objects!
    var dataObject = JSON.parse(data);
    var currentDataBlock = dataObject.results;
    
    for (j=0;j<currentDataBlock.length; j++)
    {
      console.log('erum inni loopu og erum ad horfa a ' + currentDataBlock[j].title);
      var show = currentDataBlock[j];
      var str = ".*"+criteria.title+".*";
      console.log(str);
      var showTitle = new RegExp(str, "i");
      var showDate = new Date (show.startTime);

      var showMonth = showDate.getMonth();
      var showDay = showDate.getDate();
      var showYear = showDate.getYear();

      if(tSearch && !dSearch && showTitle.test(show.title))
      {
        results.push(show);
        continue;
      }

      if(tSearch && dSearch && showTitle.test(show.title) && searchMonth===showMonth && searchDay===showDay && searchYear===showYear)
      {
        console.log('baetum titlinum: '+show.title+' vid!');
        results.push(show);
        continue;
      }

      if(!tSearch && dSearch && searchMonth===showMonth && searchDay===showDay && searchYear===showYear)
      {
        console.log('baetum vid showi: '+ show.title+'!;');
        results.push(show);
        continue;
      }

      if (!tSearch && !dSearch)
      {
        results.push(show);
      }

    }
    callback(results);
}



//============================
//      MODULE EXPORTS
//============================

exports.queryTV = queryTV;