import passport from '../lib/passport';
import path from 'path';

export default function (app) {

  app.get('/forgot', (req, res) => {  
    if (req.user && req.user.isAdmin) return res.redirect('/admin-home');
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.post('/reset', (req, res) => {
    return res.send(req.user);
  });

}

  