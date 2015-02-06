var express = require('express');
var router = express.Router();
var fillData = require('../data/data');
var DataSchema = require('../schema/data');
var data=[];
var time=[];
var result={};
function loopEvent(){
     result= fillData(data, time);
     data=result.data;
     time=result.time;
     var record = new DataSchema({
     	data: data[data.length-1]
     })
     record.save(function(err){
     	if(err){
     		console.log(err);
     	}
     	else{
     		var date =new Date();
     		var hour = date.getHours();
     		var minute = date.getMinutes();
     		var second = date.getSeconds();
     		console.log('Saved at '+date);
     	}
     })
}
loopEvent();
setInterval(loopEvent,1000*60*30);


/* GET home page. */
router.get('/', function(req, res, next) {
  DataSchema.find().setOptions({sort: 'time'})
  .exec(function(err, rawDataSet){
  		if (err) {
  			console.log(err)
  		} else{
			  console.log('Length: '+rawDataSet.length);
			  var dataSet = [];
			  var timeSet = [];
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
