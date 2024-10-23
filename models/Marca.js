const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class Marca extends Model {}

Marca.init(
  {
    id_marca: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Marca",
    tableName: "marcas"
  }
);

module.exports = Marca;