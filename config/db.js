var mongoose = require('mongoose');
mongoose.connect('mongodb://zhenghao58:8663370@ds041651.mongolab.com:41651/mydata');
module.exports = mongoose.connection;
