const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  createdTime: { type: Date, default: Date.now },
  isbn: String,
  title: String,
  author: String,
  publishing: String,
  cover: String,
});

module.exports = mongoose.model('Book', bookSchema);
