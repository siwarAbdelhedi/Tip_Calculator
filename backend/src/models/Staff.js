const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  service: { type: String, enum: ['Salle', 'Cuisine'], required: true },
  tips: { type: Number, default: 0 },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
