const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  title: {type: String, required: true },
  description: {type: String, required: true},
  tags: { type: String},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('note', noteSchema);