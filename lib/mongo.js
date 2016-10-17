var config = require('cconfig')();
var mongoose = require('mongoose');

var mongoUrl = config.MONGO_URI || 'mongodb://127.0.0.1:27017';

console.log(`initializing connection to mongo at ${config.MONGO_URI}`);

mongoose.connect(config.MONGO_URI);

mongoose.connection.on('error', function (err) {
  console.error(`✗ MongoDB Connection Error. Please make sure MongoDB is running: ${err}`);
  throw err;
});

module.exports = mongoose;