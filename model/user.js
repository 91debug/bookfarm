const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  createdTime: { type: Date, default: Date.now },
  studentId: Number,
  department: String,
  password: String,
  username: String,
  phone: String,
  pushToken: String,
});

module.exports = mongoose.model('User', userSchema);
