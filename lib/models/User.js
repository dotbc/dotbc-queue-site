import mongoose from '../mongo';
import bcrypt from 'bcrypt';

var fileSchema = mongoose.Schema({
  _id: { type: String, index: true },
  signedUrl: String,
  publicUrl: String,
  filename: String,
  description: String
});

var userSchema = mongoose.Schema({
  accepted: { type: Date },
  email: { type: String, index: true },
  files: [fileSchema],
  fullName: String,
  interest: String,
  isAdmin: { type: Boolean, index: true },
  logo: { data: Buffer, contentType: String },
  organization: String,
  password: { type: String, index: true },
  title: String,
  placeInQueue: { type: Number, index: true, default: -1 },
});

userSchema.statics.getNextQueueNumber = function (cb) {
  this.findOne({}, { placeInQueue: 1 }) 
    .sort('-placeInQueue')
    .exec((err, user) => {
      if (err) return cb(err);
      if ( ! user) return cb(null, 1);
      let placeInQueue = user.placeInQueue < 0 ? 0 : user.placeInQueue;
      return cb(null, placeInQueue + 1);
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
  return this.find({ isAdmin: { $ne: true } }) 
      .sort('-placeInQueue')
      .sort('-accepted')
      .exec(cb);
}

userSchema.statics.findAllSlim = function (cb) {
  return this.find({ isAdmin: { $ne: true } }) 
      .sort('-placeInQueue')
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

userSchema.statics.moveToPlaceInQueue = function (userId, currentPlaceInQueue, placeInQueue, cb) {
  var findOthers = {};
  var updateOthers = {};
  if (placeInQueue < currentPlaceInQueue) {
    findOthers = { placeInQueue: { $gte: placeInQueue, $lte: currentPlaceInQueue }, isAdmin: { $ne: true } };
    updateOthers = { $inc: { placeInQueue: 1 } };
  }
  if (placeInQueue > currentPlaceInQueue) {
    findOthers = { placeInQueue: { $lte: placeInQueue, $gte: currentPlaceInQueue }, isAdmin: { $ne: true } };
    updateOthers = { $inc: { placeInQueue: -1 } };
  }
  this.update(findOthers, updateOthers, { multi: true }).exec((err) => {
      if (err) return cb(err);
      return this.update({ _id: userId }, { $set: { placeInQueue: placeInQueue } }).exec(cb);
    });
  
}

export default mongoose.model('User', userSchema);