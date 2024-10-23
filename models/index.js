'use strict';

const fs = require('fs');
const path = require('path');
const sequelize = require('../config/dbConnect'); // Instancia de Sequelize
const Sequelize = require('sequelize'); // Opcional: si necesitas los tipos
const basename = path.basename(__filename);
const db = {};

// Cargar y registrar los modelos dinámicamente
fs.readdirSync(__dirname)
  .filter((file) => {
    // Filtrar solo archivos que parecen modelos Sequelize
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1 &&
      file !== 'server.js' // Ignorar archivos no deseados
    );
  })
  .forEach((file) => {
    const modelModule = require(path.join(__dirname, file));

    let model;
    if (modelModule.prototype instanceof Sequelize.Model) {
      model = modelModule;
    } else if (typeof modelModule === 'function') {
      model = modelModule(sequelize, Sequelize.DataTypes);
    } else {
      throw new Error(`El modelo ${file} no es válido.`);
    }

    db[model.name] = model;
  });

// Asociar los modelos si tienen asociaciones definidas
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
