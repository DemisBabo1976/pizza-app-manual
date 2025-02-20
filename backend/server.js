require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
//Definisci che comunicherai tramite json
app.use(express.json());

//Definisci le routes
const pizzasRouter = require('./routes/pizzas');
const categoriesRouter = require('./routes/categories');
const uploadRouter = require('./routes/upload'); // Importa la rotta per l'upload
const settingsRouter = require('./routes/settings');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');

app.use('/pizzas', pizzasRouter);
app.use('/categories', categoriesRouter);
app.use('/upload', uploadRouter);
app.use('/settings', settingsRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);

// Serve la cartella "uploads" come statica per poter accedere alle immagini dal frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Benvenuto Pizza App API');
});

//Definisci il conenction string MONGODB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log('Failed to connect to MongoDB: ', err));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});