const express = require('express');
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
      this.initExpress();
      initializeMiddlewares(this.app);
      initializeRoutes(this.app);
    } catch (error) {
      console.error('Error durante la inicialización del servidor:', error);
    }
  }

  initExpress() {
    this.app = express();
  }

  listen() {
    if (!this.app) {
      throw new Error('Express no ha sido inicializado correctamente.');
    }

    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;