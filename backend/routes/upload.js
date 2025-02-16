const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configurazione di Multer per salvare i file in una cartella uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads'); // Cartella uploads nella directory principale del backend
        cb(null, uploadDir); // Assicurati che la cartella 'uploads' esista
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });

// Rotta per gestire l'upload di un'immagine
router.post('/', upload.single('image'), (req, res) => {
    console.log("Ricevuta richiesta di upload");
    if (!req.file) {
        console.log("Nessun file incluso nella richiesta");
        return res.status(400).send({ message: 'Nessun file è stato caricato.' });
    }

    console.log("Dettagli file caricato:", req.file);

    // Restituisci l'URL del file appena caricato
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    console.log("URL immagine:", imageUrl);
    res.send({ imageUrl: imageUrl });
});

module.exports = router;