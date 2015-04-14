var express = require('express');
var router = express.Router();
var concert = require('../search');

router.get('/', function(req, res, next) {
  var term = req.query['term'];
  var date = req.query['date'];
  console.log("Processing Concert search:", term,date, ". Please be patient!");
  var testCriteria = {term: term, date: date};

  var doneFetching = function(response){
    var results = JSON.stringify(response);
    res.send(results);
  }

  concert.search(testCriteria, doneFetching);
});


module.exports = router;