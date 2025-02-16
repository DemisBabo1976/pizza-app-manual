const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.pizza'); //popola anche le informazioni delle pizze negli ordini
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.pizza');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new order
router.post('/', async (req, res) => {
    const order = new Order({
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        orderDate: req.body.orderDate,
        deliveryAddress: req.body.deliveryAddress,
        deliveryTime: req.body.deliveryTime
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an existing order
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.customerName = req.body.customerName || order.customerName;
        order.customerEmail = req.body.customerEmail || order.customerEmail;
        order.customerPhone = req.body.customerPhone || order.customerPhone;
        order.items = req.body.items || order.items;
        order.totalAmount = req.body.totalAmount || order.totalAmount;
        order.orderDate = req.body.orderDate || order.orderDate;
        order.deliveryAddress = req.body.deliveryAddress || order.deliveryAddress;
        order.deliveryTime = req.body.deliveryTime || order.deliveryTime;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;