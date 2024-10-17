const dbConnect = require('./dbConnect');

async function initializeDatabase() {
  try {
    await dbConnect.sync({ alter: false });
    console.log('Base de datos sincronizada con éxito');
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
    throw error;
  }
}

module.exports = initializeDatabase;