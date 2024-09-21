const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  amount: { type: Number, required: true },
  service: { type: String, enum: ['Salle', 'Cuisine'], required: true },
  shift: { type: String, enum: ['day', 'night'], required: true },
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema);

module.exports = Staff;
