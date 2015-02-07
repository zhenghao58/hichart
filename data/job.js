var fillData = require('./data');
var db = require('../config/db');
var DataSchema = require('../schema/data');
var data=[];

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
