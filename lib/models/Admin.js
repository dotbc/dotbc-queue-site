import mongoose from '../mongo';
import bcrypt from 'bcrypt';

var adminSchema = mongoose.Schema({
  email: { type: String, index: true },
  password: { type: String, index: true },
});

adminSchema.statics.findByEmail = function (email, cb) {
  return this.findOne({ email: email }, cb);
}

adminSchema.statics.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.statics.isPasswordValid = (admin, password) => {
  return bcrypt.compareSync(password, admin.password);
};

export default mongoose.model('Admin', adminSchema);