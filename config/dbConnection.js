const sequelize = require('./dbConnect'); // Instancia de Sequelize
const logger = require('./logger'); // Importar Winston

async function initializeDatabase() {
  try {
    await sequelize.authenticate(); // Solo autenticación, sin sync
    logger.info('Conexión a la base de datos establecida con éxito');
  } catch (error) {
    logger.error('Error al conectar la base de datos: ' + error.message);
    throw error;
  }
}

module.exports = initializeDatabase;
