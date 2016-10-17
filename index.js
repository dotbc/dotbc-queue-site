const config = require('cconfig')();
const express = require('express');
const app = express();

module.exports.start = (cb) => {

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });
console.log(config.PORT)
  app.listen(parseInt(config.PORT), cb);

};