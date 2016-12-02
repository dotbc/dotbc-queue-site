import bodyParser from 'body-parser';
import express from 'express';
import mongodbSession from 'connect-mongodb-session';
import session from 'express-session';  
import path from 'path';  
import passport from './lib/passport';
import routes from './routes';
import webpack from 'webpack';    
import webpackConfig from './webpack.config.js';
import util from 'util';

const config = require('cconfig')();

module.exports.start = (cb) => {

  const app = express();

  const compiler = webpack(webpackConfig);

  if (config.NODE_ENV === 'development') {

    app.use(require('webpack-dev-middleware')(compiler, {
      path: webpackConfig.output.path,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler, {
      path: '/__webpack_hmr'
    }));

  }

  const MongoSessionStore = mongodbSession(session);

  const store = new MongoSessionStore({
    uri: config.MONGO_URI,
    collection: 'sessions',
  });

  // Catch errors 
  store.on('error', function (error) {
    return cb(error);
  });

  app.use(session({ 
    name: 'dotbc-queue',
    secret: 'da blockchain', 
    resave: true, 
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    },
    store: store,
  }));
  app.use(require('morgan')('short'));
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res, next) => {
    if (req.path === '/' && req.user) return res.redirect('/home');
    if (req.path === '/' && req.user && req.user.isAdmin) return res.redirect('/admin-home');
    return next();
  });

  app.use('/', express.static(path.resolve(__dirname, './public')));

  app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: config.AWS_BUCKET || "dotbc-queue",
    region: 'us-east-1', //optional
    server: 'http://localhost:3000',
    signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
    headers: {'Access-Control-Allow-Origin': '*'}, // optional
    getFileKeyDir: function (req) {
      return ! req.user.isAdmin ? `${config.NODE_ENV}/${req.user.organization}` : '';
    }
  }));

  routes(app);

  app.listen(parseInt(config.PORT), cb);  

};