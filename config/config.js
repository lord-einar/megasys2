require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mariadb"
  },
  test: {
    username: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mariadb"
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mariadb"
  }
};

