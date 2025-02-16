const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizza');

// GET all pizzas
router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.json(pizzas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one pizza
router.get('/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.json(pizza);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new pizza
router.post('/', async (req, res) => {
    console.log("Ricevuta richiesta POST per nuova pizza", req.body);
    const pizza = new Pizza({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        ingredients: req.body.ingredients,
        sizes: req.body.sizes
    });
    try {
        const newPizza = await pizza.save();
        console.log("Pizza salvata con successo", newPizza);
        res.status(201).json(newPizza);
    } catch (err) {
        console.error("Errore durante il salvataggio della pizza", err);
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an existing pizza
router.put('/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        pizza.name = req.body.name || pizza.name;
        pizza.description = req.body.description || pizza.description;
        pizza.price = req.body.price || pizza.price;
        pizza.imageUrl = req.body.imageUrl || pizza.imageUrl;
        pizza.category = req.body.category || pizza.category;
        pizza.ingredients = req.body.ingredients || pizza.ingredients;
        pizza.sizes = req.body.sizes || pizza.sizes;

        const updatedPizza = await pizza.save();
        res.json(updatedPizza);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a pizza
router.delete('/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndDelete(req.params.id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.json({ message: 'Pizza deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;