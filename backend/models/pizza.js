const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 }, // Aggiunto min: 0
    imageUrl: { type: String },
    category: { type: String, required: true },
    ingredients: [{ type: String }],
    sizes: [{
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 } // Aggiunto min: 0
    }],
}, { timestamps: true });

module.exports = mongoose.model('Pizza', pizzaSchema);