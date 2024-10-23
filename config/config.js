require('dotenv').config(); // Cargar las variables de entorno

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
      freezeTableName: true, // Evitar que Sequelize pluralice nombres de tablas
      timestamps: false, // No agregar createdAt y updatedAt automáticamente
    },
  },
  test: {
    username: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
};
