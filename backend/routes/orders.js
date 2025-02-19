const express = require('express');
const router = express.Router();
const OrderS = require('../models/OrderS');
const Customer = require('../models/Customer');
const Pizza = require('../models/pizza'); // Importa Pizza con la "p" minuscola

// GET: Ottieni tutti gli ordini
router.get('/', async (req, res) => {
  try {
    const orders = await OrderS.find().populate('customer').populate('pizzas.pizza'); // Popola i riferimenti a cliente e pizze
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Ottieni un ordine specifico per ID
router.get('/:id', async (req, res) => {
  try {
    const order = await OrderS.findById(req.params.id).populate('customer').populate('pizzas.pizza'); // Popola i riferimenti
    if (!order) {
      return res.status(404).json({ message: 'Ordine non trovato' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Crea un nuovo ordine
router.post('/', async (req, res) => {
    const { customerId, orderType, pizzas, deliveryTime, notes } = req.body;

    try {
        // Verifica se il cliente esiste
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(400).json({ message: 'Cliente non trovato' });
        }

        //Verifica che le pizze esistono
        for (const item of pizzas) {
            const pizza = await Pizza.findById(item.pizza);
            if (!pizza) {
                return res.status(400).json({ message: 'Pizza non trovata' });
            }
        }

        // Calcola il prezzo totale
        let totalPrice = 0;
        for (const item of pizzas) {
            const pizza = await Pizza.findById(item.pizza);
            totalPrice += pizza.price * item.quantity;
        }

        const order = new OrderS({
            customer: customerId,
            orderType: orderType,
            pizzas: pizzas,
            deliveryTime: deliveryTime,
            totalPrice: totalPrice,
            notes: notes
        });

        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Aggiorna un ordine esistente per ID
router.put('/:id', async (req, res) => {
    try {
        const order = await OrderS.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Ordine non trovato' });
        }

        order.customer = req.body.customer || order.customer;
        order.orderType = req.body.orderType || order.orderType;
        order.deliveryTime = req.body.deliveryTime || order.deliveryTime;
        order.totalPrice = req.body.totalPrice || order.totalPrice;
        order.status = req.body.status || order.status;
        order.notes = req.body.notes || order.notes;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Elimina un ordine per ID
router.delete('/:id', async (req, res) => {
    try {
        const order = await OrderS.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Ordine non trovato' });
        }

        await order.remove();
        res.json({ message: 'Ordine eliminato' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;