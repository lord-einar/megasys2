const express = require('express');
const logger = require('../config/logger'); // Importar Winston
const initializeDatabase = require('../config/dbConnection');
const initializeMiddlewares = require('../middlewares/middlewares');
const initializeRoutes = require('../routes/routes');

class Server {
  constructor() {
    this.app = null;
    this.port = process.env.PORT || 3000;
  }

  async init() {
    try {
      await initializeDatabase();
      logger.info('Conexión a la base de datos establecida correctamente.');
      this.initExpress();
      initializeMiddlewares(this.app);
      initializeRoutes(this.app);
      logger.info('Inicialización del servidor completada correctamente.');
    } catch (error) {
      logger.error('Error durante la inicialización del servidor: ' + error.message);
    }
  }

  initExpress() {
    this.app = express();
  }

  listen() {
    if (!this.app) {
      logger.error('Express no ha sido inicializado correctamente.');
      throw new Error('Express no ha sido inicializado correctamente.');
    }

    this.app.listen(this.port, () => {
      logger.info(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;