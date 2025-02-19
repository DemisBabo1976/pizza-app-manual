const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, // Riferimento al cliente
    orderType: { type: String, enum: ['Ritiro', 'Consegna'], required: true }, // Tipo di ordine
    pizzas: [{  //Pizze sarà un'array di ID
        pizza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    deliveryTime: { type: String, required: true }, // Orario di consegna desiderato (es: "19:30")
    totalPrice: { type: Number, required: true, min: 0 }, // Prezzo totale dell'ordine
    status: { type: String, enum: ['In attesa', 'In preparazione', 'Pronto', 'Consegnato'], default: 'In attesa' }, // Stato dell'ordine
    notes: { type: String } //Eventuali note
}, { timestamps: true }); // Aggiunge createdAt e updatedAt

module.exports = mongoose.model('OrderS', orderSchema); // Modifica il nome del modello in "OrderS"