const dbConnect = require('./dbConnect');
const logger = require('./logger'); // Importar Winston

async function initializeDatabase() {
  try {
    await dbConnect.sync({ alter: false });
    logger.info('Base de datos sincronizada con éxito');
  } catch (error) {
    logger.error('Error al conectar la base de datos: ' + error.message);
    throw error;
  }
}

module.exports = initializeDatabase;
