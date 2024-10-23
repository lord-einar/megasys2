const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class Empresa extends Model {}

Empresa.init({
  id_empresa: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,  // Usar la instancia obtenida.
  modelName: 'Empresa',
  tableName: "empresas"
});


// Puedes optar por sincronizar dentro de un controlador o durante la inicialización del servidor.
module.exports = Empresa;


