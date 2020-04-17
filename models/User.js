const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userType: {
    type: String
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  auth_token: {
    type: String,
    trim: true
  },
  confirm_token: {
    type: Number,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetToken: {
    type: String,
    trim: true
  },
  resetTokenExpiration: {
    type: Date,
    trim: true
  },
  zipCode: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('User', userSchema, 'users')