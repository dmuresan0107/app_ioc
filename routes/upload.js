const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Configurăm upload local temporar
const upload = multer({ dest: 'uploads/' });

// Inițializăm Google Cloud Storage cu cheia noastră JSON
const storage = new Storage({
  keyFilename: path.join(__dirname, '..', 'gcs-key.json'), // cheia ta descărcată
});

const bucketName = 'darius-2025-bucket'; // schimbă cu numele real
const bucket = storage.bucket(bucketName);

// Ruta GET – afișează formularul HTML
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'upload.html'));
});

// Ruta POST – primește imaginea și o trimite în bucket
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('Nicio imagine încărcată.');

    // Numele original al fișierului
    const destFilename = req.file.originalname;

    // Upload către GCS
    await bucket.upload(req.file.path, {
      destination: destFilename,
    });

    res.send('✅ Upload reușit!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Eroare la upload.');
  }
});

module.exports = router;