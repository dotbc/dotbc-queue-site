import User from '../lib/models/User';
import isEmail from 'is-email';
import isAdmin from './isAdmin';
import isLoggedIn from './isLoggedIn';
import path from 'path';
import passport from '../lib/passport';
// import User from '../lib/models/User'; 

export default function (app) {

  app.get('/api/admin/queue',
    isLoggedIn,
    isAdmin, 
    (req, res, next) => {
      User.findAll((err, users) => {
        if (err) return next(err);
        res.send({
          user: req.user,
          inQueue: users.filter((user) => {
            return ! user.accepted;
          }).sort((a, b) => {
            return a.placeInQueue - b.placeInQueue;
          }),
          accepted: users.filter((user) => {
            return !! user.accepted;
          }).sort((a, b) => {
            return a.placeInQueue - b.placeInQueue;
          })
        });
      })
  });

  app.post('/api/admin/accept',
    isLoggedIn,
    isAdmin, 
    (req, res, next) => {

      const _id = req.body._id;
      const placeInQueue = req.body.placeInQueue;

      if ( ! _id) return next(new Error('_id not supplied!'));
      if ( ! placeInQueue) return next(new Error('placeInQueue not supplied!'));

      User.update({ _id: _id }, { $set: { accepted: new Date(), placeInQueue: -1 } }, (err) => {
        if (err) return next(err);
      
        User.update({ placeInQueue: { $gte: placeInQueue } }, { $inc: { placeInQueue: -1 } }, { multi: true }, (err) => {
          if (err) return next(err);
            
          User.findAll((err, users) => {
            if (err) return next(err);
        
            res.send({
              user: req.user,
              inQueue: users.filter((user) => {
                return ! user.accepted;
              }),
              accepted: users.filter((user) => {
                return !! user.accepted;
              })
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

      User.getNextQueueNumber((err, nextQueueNumber) => {
        if (err) return next(err);

        User.update({ _id: _id }, { $set: { placeInQueue: nextQueueNumber }, $unset: { accepted: 1 } }, (err) => {
          if (err) return next(err);
  
          User.findAll((err, users) => {
            if (err) return next(err);

            res.send({
              user: req.user,
              inQueue: users.filter((user) => {
                return ! user.accepted;
              }),
              accepted: users.filter((user) => {
                return !! user.accepted;
              })
            });

          });

        });

      });
  });

  app.get('/admin', isAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.get('/admin-home', isAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

}