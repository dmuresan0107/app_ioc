const express = require('express');
const router = express.Router();

// Aici poți adăuga rute mai târziu, de exemplu /logout
router.get('/test', (req, res) => {
  res.send('Auth route OK');
});

module.exports = router;