const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Inventario = require("./Inventario");
const Remito = require("./Remito");

class RemitoInventario extends Model {}

RemitoInventario.init({
  id_remito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Remito',
      key: 'id_remito'
    }
  },
  id_inventario: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Inventario',
      key: 'id_inventario'
    }
  },
  es_prestamo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  fecha_devolucion: {
    type: DataTypes.DATE
  },
  devuelto: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'RemitoInventario',
  tableName: 'remito_inventario'
});

module.exports = RemitoInventario;
