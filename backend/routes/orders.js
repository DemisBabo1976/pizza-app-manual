const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET tutti gli ordini
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customer'); // Popola i dati del cliente
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un ordine specifico
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// POST crea un nuovo ordine
router.post('/', async (req, res) => {
  const order = new Order({
    customer: req.body.customer,
    orderDate: req.body.orderDate,
    deliveryTime: req.body.deliveryTime,
    type: req.body.type,
    items: req.body.items,
    totalAmount: req.body.totalAmount
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH aggiorna un ordine
router.patch('/:id', getOrder, async (req, res) => {
  if (req.body.customer != null) {
    res.order.customer = req.body.customer;
  }
  if (req.body.orderDate != null) {
    res.order.orderDate = req.body.orderDate;
  }
  if (req.body.deliveryTime != null) {
    res.order.deliveryTime = req.body.deliveryTime;
  }
  if (req.body.type != null) {
    res.order.type = req.body.type;
  }
   if (req.body.items != null) {
    res.order.items = req.body.items;
  }
   if (req.body.totalAmount != null) {
    res.order.totalAmount = req.body.totalAmount;
  }

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE elimina un ordine
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Ordine eliminato' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id).populate('customer'); //Popola i dati del cliente
    if (order == null) {
      return res.status(404).json({ message: 'Impossibile trovare l\'ordine' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;
  next();
}

module.exports = router;