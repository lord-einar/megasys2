const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

function initializeMiddlewares(app) {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));
  app.use(morgan('dev'));
}

module.exports = initializeMiddlewares;