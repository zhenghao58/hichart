var express = require('express');
var router = express.Router();
var fillData = require('../data/data');
var DataSchema = require('../schema/data');
var data=[];
function loopEvent(){
     data= fillData(data);
     var record = new DataSchema({
     	data: data[data.length-1]
     })
     record.save(function(err){
     	if(err){
     		console.log(err);
     	}
     	else{
     		var date =new Date();
     		console.log('Saved at '+date);
     	}
     })
}
setInterval(loopEvent,1000*60*30);


/* GET home page. */
router.get('/', function(req, res, next) {
  var datePoint = new Date(Date.now()-1000*60*60*72)
  DataSchema.find().gt('time', datePoint).setOptions({sort: 'time'})
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
