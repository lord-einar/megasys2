const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../config/logger'); // Importar Winston

function initializeMiddlewares(app) {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));
  app.use(morgan('dev', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

module.exports = initializeMiddlewares;
