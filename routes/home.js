import isEmail from 'is-email';
import isLoggedIn from './isLoggedIn';
import merge from 'lodash.merge';
import mongodb from 'mongodb';
import path from 'path';
import passport from '../lib/passport';
import User from '../lib/models/User';

const config = require('cconfig')(); 

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

  // function ensureEmailMatchesCompany (req, res, next) {
  //   if ( ! isEmail(req.body.email)) {
  //     return res.send({
  //       error: 'Please provide a valid email'
  //     });
  //   } esle return next();
  // }


  app.post('/api/add-file',
    isLoggedIn,
    (req, res) => {
      
      const file = req.body.file;
      const parts = file.publicUrl.split('/');
      console.log(parts)
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
      User.findAllSlim((err, participants) => {
        if (err) return res.send({ error: err });
        const partners = participants.filter((p) => { console.log(p); return p.accepted !== undefined; });
        const waitlist = participants.filter((p) => { return p.accepted === undefined; })
        partners.forEach((p) => { p.accepted = undefined; });
        res.send({
          partners,
          waitlist,
          user: req.user
        });
      });
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