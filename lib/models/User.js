import mongoose from '../mongo';
import bcrypt from 'bcrypt';
import Queue from './Queue'; 

var fileSchema = mongoose.Schema({
  _id: { type: String, index: true },
  signedUrl: String,
  publicUrl: String,
  filename: String,
  description: String,
});

var userSchema = mongoose.Schema({
  accepted: { type: Date, index: true },
  email: { type: String, index: true },
  files: [fileSchema],
  fullName: String,
  interest: String,
  isAdmin: { type: Boolean, index: true },
  logo: String,
  organization: String,
  password: { type: String, index: true },
  title: String,
  placeInQueue: Number,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  interestedInSponsoredDevelopment: Boolean,
  hideMeFromPublic: Boolean
});

userSchema.statics.getNextQueueNumber = function (cb) {		
  Queue.get((err, queue) => {		
    if (err) return cb(err);				
    return cb(null, queue.inQueue.length + 1);		
  });		
}

userSchema.methods.addFile = function (file, cb) {
  if ( ! this.files) this.files = [];
  this.files.push(file);
  return this.save(cb);
}

userSchema.statics.findAdminByEmail = function (email, cb) {
  return this.findOne({ email: email, isAdmin: true }, cb);
}

userSchema.statics.findAdmins = function (cb) {
  return this.find({ isAdmin: true }, cb);
}

userSchema.statics.findAll = function (cb) {
  return this.find({ isAdmin: { $ne: true } }, { password: 0 }) 
    .sort('-accepted')
    .exec(cb);
}

userSchema.statics.findAllPublic = function (cb) {
  return this.find({ isAdmin: { $ne: true } }) 
    .sort('-accepted')
    .select({ fullName: 1, organization: 1, title: 1 })
    .exec(cb);
}

userSchema.statics.findAllSlim = function (cb) {
  return this.find({ isAdmin: { $ne: true } })       
    .sort('-accepted')
    .select({ organization: 1, fullName: 1, title: 1, accepted: 1 })
    .exec(cb);
}

userSchema.statics.findByEmail = function (email, cb) {
  return this.findOne({ email: email, isAdmin: undefined }, cb);
}

userSchema.statics.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.statics.isPasswordValid = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export default mongoose.model('User', userSchema);