import mongoose from '../mongo';
import bcrypt from 'bcrypt';

var userSchema = mongoose.Schema({
  email: { type: String, index: true },
  password: { type: String, index: true },
  fullName: String,
  organization: String,
  title: String,
  interest: String,
  placeInQueue: { type: Number, index: true, default: -1 },
});

userSchema.statics.getNextQueueNumber = function (cb) {
  this.findOne({}, { placeInQueue: 1 }) 
    .sort('-placeInQueue')
    .exec((err, user) => {
      if (err) return cb(err);
      if ( ! user) return cb(null, 1);
      return cb(null, user.placeInQueue + 1);
    });
}

userSchema.statics.findByEmail = function (email, cb) {
  return this.findOne({ email: email }, cb);
}

userSchema.statics.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.statics.isPasswordValid = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('User', userSchema);