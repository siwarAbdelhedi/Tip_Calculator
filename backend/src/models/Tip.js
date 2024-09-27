const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  name: String,
  tip: Number,
  shift: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tip', tipSchema);
