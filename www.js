import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';  
import path from 'path';  
import multer from 'multer';
import passport from './lib/passport';
import routes from './routes';
import webpack from 'webpack';  
import webpackMiddleware from 'webpack-dev-middleware';  
import webpackConfig from './webpack.config.js';
import util from 'util';

const config = require('cconfig')();
const upload = multer(); // for parsing multipart/form-data

module.exports.start = (cb) => {

  const app = express();  
  const compiler = webpack(webpackConfig);

  app.use('/', express.static(path.resolve(__dirname, './public')));
  app.use(webpackMiddleware(compiler));  

  app.use(session({ 
    name: 'dotbc-queue',
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false 
  }));
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(passport.initialize());
  app.use(passport.session());

  routes(app);

  app.listen(parseInt(config.PORT), cb);  

};