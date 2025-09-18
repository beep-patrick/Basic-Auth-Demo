const express = require('express');
const authMiddleware = require('../middleware/basicAuth');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, ${req.auth.user}` });
});

module.exports = router;