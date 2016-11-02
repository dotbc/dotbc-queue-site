import isEmail from 'is-email';
import isAdmin from './isAdmin';
import isLoggedIn from './isLoggedIn';
import path from 'path';
import passport from '../lib/passport';
// import User from '../lib/models/User'; 

export default function (app) {

  app.post('/api/admin',
    ensureEmail,
    // ensureEmailMatchesCompany,
    passport.authenticate('local-signup'), 
    (req, res) => {
      res.send(res.user);
  });

  app.get('/admin', isLoggedIn, isAdmin, (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

}