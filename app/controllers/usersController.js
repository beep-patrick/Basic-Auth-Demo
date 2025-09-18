const express = require('express');
const bcrypt = require('bcrypt');
const redis = require('../services/redisClient');
const { validatePassword } = require('../utils/password');

const router = express.Router();

router.post('/users', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const exists = await redis.exists(`user:${username}`);
  if (exists) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const error = await validatePassword(password);
  if (error) {
    return res.status(400).json({ error });
  }

  const hash = await bcrypt.hash(password, 12);
  await redis.hSet(`user:${username}`, { hash });

  res.status(201).json({ message: 'User created successfully' });
});

module.exports = router;
