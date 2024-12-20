const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConnect');

class Sede extends Model {}

Sede.init({
  id_sede: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_empresa: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Empresas',
      key: 'id_empresa',
    },
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  localidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provincia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip_asignada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Sede',
  tableName: 'sedes',
});

module.exports = Sede;
