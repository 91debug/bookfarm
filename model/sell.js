const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const sellSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  book: {
    isbn: String,
    title: String,
    author: String,
    publishing: String,
    cover: String,
  },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  createdTime: { type: Date, default: Date.now },
  price: {
    type: Number,
    required: true,
  },
  state: String,
});

sellSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Sell', sellSchema);
