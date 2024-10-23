const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class Servicio extends Model {}

Servicio.init({
  id_servicio: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Servicio',
  tableName: "servicios"
});

module.exports = Servicio