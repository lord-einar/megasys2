// dbConnect.js
const { Sequelize } = require("sequelize");

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
    console.log("Base de datos conectada!!!");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  });

module.exports = sequelize;
