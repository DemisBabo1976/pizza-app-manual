const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    loyaltyPoints: { type: Number, default: 0 } // Punti fedeltà
}, { timestamps: true }); // Aggiunge createdAt e updatedAt

module.exports = mongoose.model('Customer', customerSchema);