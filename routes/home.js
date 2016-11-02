import isEmail from 'is-email';
import isLoggedIn from './isLoggedIn';
import path from 'path';
import passport from '../lib/passport';
// import User from '../lib/models/User'; 

export default function (app) {

  function ensureEmail (req, res, next) {
    if ( ! isEmail(req.body.email)) {
      return res.send({
        error: 'Please provide a valid email'
      });
    } else return next();
  }

  // function ensureEmailMatchesCompany (req, res, next) {
  //   if ( ! isEmail(req.body.email)) {
  //     return res.send({
  //       error: 'Please provide a valid email'
  //     });
  //   } esle return next();
  // }

  app.get('/api/home',
    isLoggedIn, 
    (req, res) => {
      res.send(req.user);
  });

  app.post('/api/home',
    ensureEmail,
    // ensureEmailMatchesCompany,
    passport.authenticate('local-signup'), 
    (req, res) => {
      res.send(res.user);
  });

  app.get('/home', isLoggedIn, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

}