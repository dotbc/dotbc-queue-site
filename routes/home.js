import isEmail from 'is-email';
import isLoggedIn from './isLoggedIn';
import merge from 'lodash.merge';
import mongodb from 'mongodb';
import path from 'path';
import passport from '../lib/passport';
import Queue from '../lib/models/Queue';
import User from '../lib/models/User';

const config = require('cconfig')();

var knox = require('knox');

var client = knox.createClient({
  key: config.AWS_ACCESS_KEY_ID,
  secret: config.AWS_SECRET_ACCESS_KEY,
  bucket: config.AWS_BUCKET,
});

export default function (app) {

  function ensureEmail (req, res, next) {
    if ( ! isEmail(req.body.email)) {
      return res.send({
        error: 'Please provide a valid email'
      });
    } else return next();
  }

  function ensureNonAdmin (req, res, next) {
    if ( req.user && req.user.isAdmin) return res.redirect('/admin-home');
    return next();
  }

  app.post('/api/add-file',
    isLoggedIn,
    (req, res) => {
      
      const file = req.body.file;
      const parts = file.publicUrl.split('/');

      const s3 = parts[1];
      const uploads = parts[2];
      const filename = parts[3];

      file.publicUrl = `${s3}/${uploads}/${config.NODE_ENV}/${req.user.organization}/${filename}`;
      
      req.user.addFile(file, (err, user) => {
        if (err) return res.send(err);
        else res.send(user);
      })

  });

  app.get('/api/index',
    (req, res) => {
      Queue.get((err, queue) => {
        if (err) return res.send({ error: err });
        res.send({
          user: req.user,
          waitlist: queue.inQueue.filter((u) => { return u.get('hideMeFromPublic') !== true; }),
          partners: queue.accepted.filter((u) => { return u.get('hideMeFromPublic') !== true; }),
        });
      });
  });

  app.post('/api/delete-file',
    isLoggedIn,
    (req, res) => {
      
      const fileId = req.body.fileId;

      const file = req.user.files.find((f) => {
        return f._id === fileId;
      });

      User.update({ _id: req.user._id }, { $pull: { files: { _id: fileId} } }, (err) => {
        if (err) return res.send(err);
        const fileAtPath = file.publicUrl.substring(10, file.publicUrl.length);
        client.del(fileAtPath).on('response', () => {
          res.send({ ok: 1 });
        }).on('error', (err) => {
          res.send({ error: err.message });
        }).end();
      })

  });

  app.get('/api/home',
    isLoggedIn, 
    (req, res) => {
      res.send(req.user);
  });

  app.post('/api/home',
    ensureEmail,
    // ensureEmailMatchesCompany,
    ensureNonAdmin,
    passport.authenticate('local-signup'), 
    (req, res) => {
      res.send(res.user);
  });

  app.post('/api/update-file-description',
    isLoggedIn,
    (req, res) => {

      const file = req.user.files.find((file) => { return file._id === req.body.fileId; })

      if ( ! file) return res.send(new Error('no file found with id provided'));

      file.description = req.body.description;

      req.user.save((err, user) => {
        if (err) return res.send({ error: err });
        else res.send({ description: req.body.description });
      });

  });

  app.post('/api/update-form-data',
    isLoggedIn,
    (req, res) => {

      const field = req.body;

      if ( ! field) return res.send(new Error('no form field data provided'));

      merge(req.user, field);

      req.user.save((err, user) => {
        if (err) return res.send({ error: err });
        else res.send(user);
      });

  });
  
  app.get('/home', isLoggedIn, ensureNonAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

}