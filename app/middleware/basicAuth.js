const bcrypt = require('bcrypt');
const basicAuth = require('express-basic-auth');
const redis = require('../services/redisClient');

const authMiddleware = basicAuth({
  authorizer: async (username, password, cb) => {
    try {
      const user = await redis.hGetAll(`user:${username}`);
      if (!user.hash) return cb(null, false);

      const match = await bcrypt.compare(password, user.hash);
      cb(null, match);
    } catch (err) {
      cb(null, false);
    }
  },
  authorizeAsync: true,
  challenge: true,
});

module.exports = authMiddleware;
