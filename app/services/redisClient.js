const { createClient } = require('redis');

const redis = createClient();
redis.connect().catch(console.error);

module.exports = redis;
