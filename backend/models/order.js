const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String },
    items: [{
        pizza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryAddress: { type: String },
    deliveryTime: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);