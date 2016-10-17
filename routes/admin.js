import isEmail from 'is-email';
import isAdmin from './isAdmin';
import isLoggedIn from './isLoggedIn';
import assign from 'lodash.assign';
import multer from 'multer';
import path from 'path';
import passport from '../lib/passport';
import Queue from '../lib/models/Queue';
import User from '../lib/models/User';

const config = require('cconfig')();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default function (app) {

  app.get('/api/admin/queue',
    isLoggedIn,
    isAdmin, 
    (req, res, next) => {
      Queue.get((err, queue) => {
        res.send({
          user: req.user,
          inQueue: queue.inQueue,
          accepted: queue.accepted,
        });
      });
  });

  app.post('/api/admin/accept',
    isLoggedIn,
    isAdmin, 
    (req, res, next) => {

      const _id = req.body._id;

      if ( ! _id) return next(new Error('_id not supplied!'));

      User.update({ _id: _id }, { $set: { accepted: new Date() } }, (err) => {
        if (err) return next(err);

        Queue.acceptUser(_id, (err) => {
          if (err) return next(err);

          Queue.get((err, queue) => {
            res.send({
              user: req.user,
              inQueue: queue.inQueue,
              accepted: queue.accepted,
            });
          });

        });

      });

  });

  app.post('/api/admin/unaccept',
    isLoggedIn,
    isAdmin, 
    (req, res, next) => {
      const _id = req.body._id;

      if ( ! _id) return next(new Error('_id not supplied!'));

      User.update({ _id: _id }, { $unset: { accepted: 1 } }, (err) => {
        if (err) return next(err);

        Queue.unacceptUser(_id, (err) => {
          if (err) return next(err);

          Queue.get((err, queue) => {
            res.send({
              user: req.user,
              inQueue: queue.inQueue,
              accepted: queue.accepted,
            });
          });

        });

      });

  });

  app.post('/api/admin/update-logo/:userId',
    isLoggedIn,
    (req, res) => {

      const logo = req.body.logo;
      const userId = req.params.userId;

      if ( ! logo) return res.send({ error: 'no logo data provided' });
      if ( ! userId) return res.send({ error: 'no userId data provided' });

      User.update({ _id: userId }, { $set: { logo: logo } }, (err, user) => {
        if (err) return res.send({ error: err });
        else res.send({ logo });
      });

  });

  app.post('/api/admin/update-place-in-queue',
    isLoggedIn,
    (req, res) => {

      const placeInQueue = req.body.placeInQueue;
      const userId = req.body.userId;

      if ( ! placeInQueue) return res.send({ error: 'no form placeInQueue data provided' });
      if ( ! userId) return res.send({ error: 'no form userId data provided' });

      Queue.moveUser(userId, placeInQueue, (err, user) => {
        if (err) return res.send({ error: err });
        else res.send({ ok: true });
      });

  });

  app.get('/admin', isAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.get('/admin-home', isAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

}