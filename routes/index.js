import admin from './admin';
import home from './home';
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
  app.get('*', (req, res) => {  
    return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });

}