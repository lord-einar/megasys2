// app.js
require('dotenv').config();
const Server = require('./models/server');
const errorHandler = require('./middlewares/errorHandler');

async function startServer() {
  try {
    const server = new Server();
    await server.init();
    server.listen();

    // Agregar el middleware para manejar errores al final del flujo
    server.app.use(errorHandler);
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
