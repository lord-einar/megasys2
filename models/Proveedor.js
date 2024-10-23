const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConnect');
const ContactoProveedor = require('./ContactoProveedor'); // Relación con ContactoProveedor

class Proveedor extends Model {}

Proveedor.init({
  id_proveedor: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  nombre_ejecutivo: {
    type: DataTypes.STRING,
  },
  email_ejecutivo: {
    type: DataTypes.STRING,
  },
  observaciones: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Proveedor',
  tableName: 'proveedores',
  timestamps: false,
});

// Asociación Proveedor -> ContactoProveedor
Proveedor.hasMany(ContactoProveedor, {
  foreignKey: 'id_proveedor',
  as: 'contactos',
});

ContactoProveedor.belongsTo(Proveedor, {
  foreignKey: 'id_proveedor',
  as: 'proveedor',
});

module.exports = Proveedor;
