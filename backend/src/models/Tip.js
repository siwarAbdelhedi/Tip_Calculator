const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tip', tipSchema);