// dbConnect.js
const { Sequelize } = require("sequelize");
const logger = require('./logger'); // Importar Winston

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASS,    
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Base de datos conectada!!!"); // Reemplazar console.log con logger.info
  })
  .catch((error) => {
    logger.error("Error al conectar a la base de datos: " + error.message); // Reemplazar console.error con logger.error
    throw error;
  });

module.exports = sequelize;
