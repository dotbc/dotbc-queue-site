import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';  
import path from 'path';  
import multer from 'multer';
import passport from './lib/passport';
import routes from './routes';
import webpack from 'webpack';  
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';  
import webpackConfig from './webpack.config.js';
import util from 'util';

const config = require('cconfig')();
const upload = multer(); // for parsing multipart/form-data

module.exports.start = (cb) => {

  const app = express();

  const compiler = webpack(webpackConfig);

  if (config.NODE_ENV === 'development') {

    app.use(webpackDevMiddleware(compiler, {
      path: webpackConfig.output.path,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr'
    }));

  }

  app.use('/', express.static(path.resolve(__dirname, './public')));

  app.use(session({ 
    name: 'dotbc-queue',
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false 
  }));
  app.use(require('morgan')('short'));
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: "dotbc-queue",
    region: 'us-east-1', //optional
    server: 'http://localhost:3000',
    signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
    headers: {'Access-Control-Allow-Origin': '*'}, // optional
    ACL: 'public-read', 
  }));

  routes(app);

  app.listen(parseInt(config.PORT), cb);  

};