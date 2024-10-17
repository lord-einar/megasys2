require('dotenv').config();
const Server = require('./models/server');

async function startServer() {
  try {
    const server = new Server();
    await server.init(); // Asegurarse de que el servidor se inicializa completamente
    server.listen(); // Escuchar solo después de la inicialización correcta
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();