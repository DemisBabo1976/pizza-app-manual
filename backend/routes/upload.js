const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Configura CORS per consentire richieste solo dal tuo frontend
const corsOptions = {
  origin: 'http://localhost:3002', // Sostituisci con l'URL del tuo frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permetti l'invio di cookie e header di autenticazione
  optionsSuccessStatus: 204,
};

router.use(cors(corsOptions));

// Configurazione di Multer per salvare i file in una cartella uploads
const storage = multer({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 }, // Limita a 2MB
});

// Rotta per gestire l'upload di un'immagine
router.post('/', upload.single('image'), (req, res) => {
  console.log("Richiesta di upload ricevuta");
  if (!req.file) {
    console.log("Nessun file incluso nella richiesta");
    return res.status(400).send({ message: 'Nessun file è stato caricato.' });
  }

  console.log("File caricato:", req.file);
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  console.log ( 'il path è', imageUrl)
  res.json({ imageUrl: imageUrl });
});

module.exports = router;