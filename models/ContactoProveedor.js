const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConnect');

class ContactoProveedor extends Model {}

ContactoProveedor.init({
  id_contacto: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_proveedor: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  nombre_contacto: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  nivel_soporte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Nivel de soporte del contacto, por ejemplo, 1 para nivel 1, 2 para nivel 2, etc.',
  },
}, {
  sequelize,
  modelName: 'ContactoProveedor',
  tableName: 'contactos_proveedores',
  timestamps: true,
});

module.exports = ContactoProveedor;
