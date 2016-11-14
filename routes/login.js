import passport from '../lib/passport';
import path from 'path';

export default function (app) {

  app.get('/admin-login', (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.get('/login', (req, res) => {  
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.post('/admin-login', passport.authenticate('local-admin-login'), (req, res) => {
    return res.send(req.user);
  });

  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    return res.send(req.user);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    return req.session.destroy((err) => {
      return res.redirect('/'); 
    });
  });

}

  