import async from 'async';
import crypto from 'crypto';
import { validate } from 'isemail';
import { send } from '../lib/mailgun';
import passport from '../lib/passport';
import path from 'path';
import User from '../lib/models/User';

const config = require('cconfig')();

export default function (app) {

  app.get('/forgot', (req, res) => {  
    res.render('forgot', {
      user: req.user
    });
  });

  app.post('/forgot', function(req, res, next) {

    const email = req.body.email;

    if ( ! validate(email)) {
      req.flash('error', 'Please enter a valid email.');
      return res.redirect('/forgot');
    }

    async.waterfall([
      function (done) {
        crypto.randomBytes(20, function(err, buf) {
          if (err) return next(err);
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email }, function(err, user) {
          if (err) return done(err);
          if ( ! user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save((err) => {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {

        const options = {
          to: user.email,
          from: `noreply@${config.HOSTNAME}`,
          subject: `${config.HOSTNAME} Password Reset`,
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'https://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        send(options, (err) => {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });

      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });

}