const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});
});

module.exports = router;