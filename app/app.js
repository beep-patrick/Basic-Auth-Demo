const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Automatically load all controllers in controllers/
const controllersPath = path.join(__dirname, 'controllers');
fs.readdirSync(controllersPath).forEach(file => {
  if (file.endsWith('.js')) {
    const controller = require(path.join(controllersPath, file));
    app.use('/', controller); // controllers self-register their routes
  }
});

module.exports = app;
