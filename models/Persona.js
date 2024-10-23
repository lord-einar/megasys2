const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class Persona extends Model {}

Persona.init({
  id_persona: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Persona',
  tableName: "personas"
});

module.exports = Persona;