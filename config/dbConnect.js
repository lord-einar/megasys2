// dbConnect.js
const { Sequelize } = require("sequelize");
const logger = require("./logger"); // Importar Winston

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    dialectOptions: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  }
);


const originalAuthenticate = sequelize.authenticate;

sequelize.authenticate = async function () {
  console.log("Sequelize.authenticate() fue invocado desde:");
  console.trace(); // Imprime el stack trace completo
  return originalAuthenticate.apply(this, arguments);
};

module.exports = sequelize;
