import admin from './admin';
import home from './home';
import isLoggedIn from './isLoggedIn';
import join from './join';
import login from './login';
import passport from '../lib/passport';
import path from 'path';
import User from '../lib/models/User'; 

export default function (app) {

  admin(app);

  home(app);
  
  join(app);

  login(app);

  // catch all other requests and serve main page
  app.get('*', (req, res, next) => {  
    if (req.path === '/' && req.user) return res.redirect('/home');
    if (req.path === '/' && req.user && req.user.isAdmin) return res.redirect('/admin-home');
    return res.status(404).send('Woops! Nothing to be found here!');
  });

}