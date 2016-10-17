const config = require('cconfig')();

let webpackConfig;

if (config.NODE_ENV === 'development')
  webpackConfig = require('./webpack.development.config.js');
else 
  webpackConfig = require('./webpack.production.config.js');

module.exports = webpackConfig;