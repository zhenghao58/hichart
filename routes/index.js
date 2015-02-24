var express = require('express');
var router = express.Router();
var DataSchema = require('../schema/data');



/* GET home page. */
router.get('/', function(req, res, next) {
  var datePoint = new Date(Date.now()-1000*60*60*24*30)
  DataSchema.find().gt('time', datePoint).setOptions({sort: 'time'})
  .exec(function(err, rawDataSet){
  		if (err) {
  			console.log(err)
  		} else{
			  console.log('Length: '+rawDataSet.length);
			  var dataSet = [];
			  var timeSet = [];
			  rawDataSet = rawDataSet.slice(rawDataSet.length-70);
			  console.log(rawDataSet);
			  rawDataSet.forEach(function(rawData){
			  	dataSet.push(rawData.data);
			  	timeSet.push(rawData.time.getTime());
			  })

			  res.render('index', {
			  	title: 'Real Time Graph Table', 
			  	data: dataSet,
			  	time: timeSet
			  });
  		};
  })

});

module.exports = router;
