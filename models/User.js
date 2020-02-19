const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  avatarPath: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

mongoose.model('User', UserSchema);