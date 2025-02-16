require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch(err => console.log('Failed to connect to MongoDB: ', err));

const pizzasRouter = require('./routes/pizzas');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');

app.use('/pizzas', pizzasRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);

app.get('/', (req, res) => {
  res.send('Benvenuto Pizza App API');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});