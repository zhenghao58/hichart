var db = require('../config/db');
var DataSchema = require('../schema/data');
var previous;
var datePoint = new Date(Date.now()-1000*60*60*25);
DataSchema.findOne().gt('time', datePoint).exec(function(err, previousData){
     if(err){
          console.log(err);
     }
     else{
          if (previousData) {
               previous = previousData.data;
               console.log(previous);   
          } else{
               previous = Math.random()*100;
               previous = Number(previous.toFixed(2));
               console.log("Can't find! Use a random number:"+previous);
          };
          

          var data = previous + Math.random() * 20 - 10;
          data = Number(data.toFixed(2));
          data = data < 0 ? 0 : data > 100 ? 100 : data;
          var record = new DataSchema({
               data: data
          })

          record.save(function(err){
               if(err){
                    console.log(err);
               }
               else{
                    var date =new Date();
                    console.log('Saved at '+date + 'Data: '+ data);
               }
          })
     }
})

