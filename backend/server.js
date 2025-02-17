require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); // Importa body-parser
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());

// Aumenta il limite di dimensione del payload
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log('Failed to connect to MongoDB: ', err));

const pizzasRouter = require('./routes/pizzas');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const uploadRouter = require('./routes/upload'); // Importa la route /upload

app.use('/pizzas', pizzasRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve i file statici
app.use('/upload', uploadRouter); // Usa la route /upload

app.get('/', (req, res) => {
    res.send('Benvenuto Pizza App API');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});