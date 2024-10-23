const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class Rol extends Model {}

Rol.init({
  id_rol: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,  // Usar la instancia obtenida.
  modelName: 'Rol',
  tableName: "roles"
});


// Puedes optar por sincronizar dentro de un controlador o durante la inicialización del servidor.
module.exports = Rol;