const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class TipoArticulo extends Model {}

TipoArticulo.init(
  {
    id_tipo_articulo: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "TipoArticulo",
    tableName: "tipo_articulos"
  }
);

module.exports = TipoArticulo;