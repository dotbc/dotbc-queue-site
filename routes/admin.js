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
          }),
          accepted: users.filter((user) => {
            return !! user.accepted;
          })
        });
      })
  });

  app.post('/api/admin/accept',
    isLoggedIn,
    isAdmin, 
    (req, res, next) => {
      const _id = req.body._id;
      if ( ! _id) return next(new Error('_id not supplied!'));
      User.update({ _id: _id }, { $set: { accepted: new Date() } }, (err) => {
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

  app.post('/api/admin/unaccept',
    isLoggedIn,
    isAdmin, 
    (req, res, next) => {
      const _id = req.body._id;
      if ( ! _id) return next(new Error('_id not supplied!'));
      User.update({ _id: _id }, { $unset: { accepted: 1 } }, (err) => {
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

  app.get('/admin', isAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.get('/admin-home', isAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

}