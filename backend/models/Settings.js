const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    capacity: { type: Number, required: true, min: 1 }, // Capacità del forno (numero massimo di pizze)
    prepTime: { type: Number, enum: [5, 10, 15, 20, 25], required: true }, // Tempo di preparazione (minuti)
    startTime: { type: String, required: true }, // Orario di inizio del servizio (es: "18:00")
    endTime: { type: String, required: true }    // Orario di fine del servizio (es: "22:00")
});

module.exports = mongoose.model('Settings', settingsSchema);