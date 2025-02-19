const mongoose = require('mongoose');
const Pizza = require('./models/pizza'); // Assicurati che il percorso sia corretto

require('dotenv').config()
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log('Failed to connect to MongoDB: ', err));

async function test() {
    try {
        const pizzas = await Pizza.find();
        console.log(JSON.stringify(pizzas, null, 2)); // Stampa le pizze formattate come JSON
        mongoose.connection.close(); // Chiudi la connessione dopo aver recuperato le pizze
    } catch (err) {
        console.error("Errore durante il recupero delle pizze", err);
    }
}

test();