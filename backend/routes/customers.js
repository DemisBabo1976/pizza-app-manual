const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET: Ottieni tutti i clienti
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Ottieni un cliente specifico per ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Crea un nuovo cliente
router.post('/', async (req, res) => {
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    });

    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Aggiorna un cliente esistente per ID
router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }

        customer.firstName = req.body.firstName || customer.firstName;
        customer.lastName = req.body.lastName || customer.lastName;
        customer.phone = req.body.phone || customer.phone;
        customer.email = req.body.email || customer.email;
        customer.address = req.body.address || customer.address;
        customer.loyaltyPoints = req.body.loyaltyPoints || customer.loyaltyPoints;

        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Elimina un cliente per ID
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id); // Modifica qui
        if (!customer) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json({ message: 'Cliente eliminato' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;