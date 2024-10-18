const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('../config/passport'); // Importar Passport
const logger = require('../config/logger'); // Importar Winston

function initializeMiddlewares(app) {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false })); // Agrega esta línea
  app.use(express.static('public'));
  app.use(morgan('dev', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));

  // Configurar la sesión
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  // Inicializar Passport
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = initializeMiddlewares;
