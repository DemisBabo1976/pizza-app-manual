const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET tutti i clienti
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un cliente specifico
router.get('/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// POST crea un nuovo cliente
router.post('/', async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address,
    birthDate: req.body.birthDate,
    email: req.body.email,
    loyaltyPoints: req.body.loyaltyPoints
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH aggiorna un cliente
router.patch('/:id', getCustomer, async (req, res) => {
  if (req.body.firstName != null) {
    res.customer.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.customer.lastName = req.body.lastName;
  }
   if (req.body.phone != null) {
    res.customer.phone = req.body.phone;
  }
  if (req.body.address != null) {
    res.customer.address = req.body.address;
  }
  if (req.body.birthDate != null) {
    res.customer.birthDate = req.body.birthDate;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }
  if (req.body.loyaltyPoints != null) {
    res.customer.loyaltyPoints = req.body.loyaltyPoints;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE elimina un cliente
router.delete('/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.deleteOne();
    res.json({ message: 'Cliente eliminato' });
  } catch (err) {
    console.error("Errore durante l'eliminazione del cliente:", err);
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: 'Impossibile trovare il cliente' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
}

module.exports = router;