const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configurazione di Multer per salvare i file in una cartella specifica
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Cartella dove verranno salvate le immagini
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Ottieni l'estensione del file
        const filename = Date.now() + ext; // Crea un nome file univoco
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Route per l'upload delle immagini
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nessun file immagine caricato' });
    }

    // Ottieni l'URL completo del file
    const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;

    console.log("File caricato con successo. URL:", imageUrl);

    res.status(200).json({ imageUrl: imageUrl });
});

module.exports = router;