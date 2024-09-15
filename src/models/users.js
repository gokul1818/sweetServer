const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber:{
    type: Number,
    required: true,
    unique: true
  },
  emailId:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  magicToken: {
    type: String,
    default: null
  },
  tokenExpires: {
    type: Date,
    default: null
  }


});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.setMagicToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.magicToken = token;
  this.tokenExpires = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
