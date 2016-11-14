import passport from 'passport';  
import { Strategy } from 'passport-local';
import User from './models/User';

// admin login strategy
passport.use('local-admin-login', new Strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, (req, email, password, cb) => {
  User.findAdminByEmail(email, (err, admin) => {
    if (err) { return cb(err); }
    if ( ! admin) { return cb(null, false); }
    if ( ! User.isPasswordValid(admin, password)) { return cb(null, false); }
    return cb(null, admin);
  });
}));

// user login strategy
passport.use('local-login', new Strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, (req, email, password, cb) => {
  User.findByEmail(email, (err, user) => {
    if (err) { return cb(err); }
    if ( ! user) { return cb(null, false); }
    if ( ! User.isPasswordValid(user, password)) { return cb(null, false); }
    return cb(null, user);
  });
}));

// signup strategy
passport.use('local-signup', new Strategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
}, (req, email, password, cb) => {

  User.findByEmail(email, (err, user) => {
    if (err) { return cb(err); }

    // user exists already
    if (user) { 
      console.log('user already exists')
      return cb(null, false); 
    }

    // create user
    var user = new User();

    user.email = email;
    user.password = User.generateHash(password);
    user.fullName =  req.body.fullName;
    user.organization = req.body.organization;
    user.title = req.body.title;
    user.interest = req.body.interest;

    User.getNextQueueNumber((err, nextQueueNumber) => {
      if (err) return cb(err);

      user.placeInQueue = nextQueueNumber;

      user.save(function(err) {
        return cb(err, user);
      });

    });

  });

}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, done);
});

export default passport;