const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// GET: Ottieni le impostazioni correnti
router.get('/', async (req, res) => {
    try {
        // Assumiamo che ci sia solo un documento di impostazioni. Se non esiste, ne creiamo uno.
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({
                capacity: 10, // Valori predefiniti
                prepTime: 10,
                startTime: "18:00",
                endTime: "22:00"
            });
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Aggiorna le impostazioni correnti
router.put('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
             return res.status(404).json({ message: 'Impostazioni non trovate' });
        }
        
        settings.capacity = req.body.capacity || settings.capacity;
        settings.prepTime = req.body.prepTime || settings.prepTime;
        settings.startTime = req.body.startTime || settings.startTime;
        settings.endTime = req.body.endTime || settings.endTime;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;