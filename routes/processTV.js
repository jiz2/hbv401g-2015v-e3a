var express = require('express');
var router = express.Router();
var apM = require('../apisMessenger');

router.get('/', function(req, res, next) {
  var title = req.query['title'];
  var station = req.query['stations'];
  var date = req.query['date'];
  console.log("Processing TV search:", title,station,date, "Please be patient!");
  var testCriteria = {title: title, station: station, date: date};

  var doneFetching = function(response){
    var results = JSON.stringify(response);
    res.send(results);
  }

  apM.queryTV(testCriteria, doneFetching);
});


module.exports = router;