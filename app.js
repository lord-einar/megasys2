require('dotenv').config();
const Server = require('./models/server');

async function startServer() {
  try {
    const server = new Server();
    await server.init();
    server.listen();
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();