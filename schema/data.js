var mongoose = require('mongoose');
module.exports = mongoose.model('Data', {
  data: Number,
  time: { 
  	type: Date,
  	default: Date.now,
  	expires: '14d'
  	}
});