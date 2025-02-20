const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, // Riferimento al cliente
  orderDate: { type: Date, default: Date.now },
  deliveryTime: { type: String, required: true }, // Fascia oraria
  type: { type: String, enum: ['Consegna', 'Ritiro'], required: true }, // Tipo di ordine
  items: [{ // Elenco degli articoli ordinati
    name: { type: String, required: true }, // Nome dell'articolo
    quantity: { type: Number, required: true }, // Quantità
    price: { type: Number, required: true }  //Prezzo unitario
  }],
  totalAmount: { type: Number, required: true } // Importo totale
});

module.exports = mongoose.model('Order', orderSchema);