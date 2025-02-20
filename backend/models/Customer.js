const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // togli required
  lastName: { type: String, required: true }, // togli required
  phone: { type: String },
  address: { type: String },
  birthDate: { type: Date }, // Data di nascita
  email: { type: String }, // Email
  loyaltyPoints: { type: Number, default: 0 } // Punti raccolti (default a 0)
});

module.exports = mongoose.model('Customer', customerSchema);