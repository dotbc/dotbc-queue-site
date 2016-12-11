import isEmail from 'is-email';
import path from 'path';
import passport from '../lib/passport';
import Queue from '../lib/models/Queue';
import User from '../lib/models/User'; 

export default function (app) {

  function ensureEmail (req, res, next) {
    if ( ! isEmail(req.body.email)) {
      console.log('email not provided.')
      return res.send({
        errorMessage: 'Please provide a valid email'
      });
    } 
    return next();
  }

  function ensureEmailUnique (req, res, next) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);
      if (user) {
        console.log('account already exists for email')
        return res.send({
          errorMessage: `An account already exists for ${req.body.email}`
        });
      }
      return next();
    });
  }

  // function ensureEmailMatchesCompany (req, res, next) {
  //   if ( ! isEmail(req.body.email)) {
  //     return res.send({
  //       error: 'Please provide a valid email'
  //     });
  //   } esle return next();
  // }

  app.post('/api/join',
    ensureEmail,
    ensureEmailUnique,
    passport.authenticate('local-signup'), 
    (req, res, next) => {
      Queue.addUser(res.user._id, (err) => {
        if (err) return next(err);
        res.send(res.user);
      });
  });

  app.get('/join', (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

}