const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class Inventario extends Model {}

Inventario.init({
  id_inventario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  id_sede: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: '274f9dd7-777a-45ab-a9a2-667ab9c9b4e6',
    references: {
      model: 'Sedes',
      key: 'id_sede'
    }
  },
  id_marca: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: 'Marcas',
      key: 'id_marca'
    }
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_tipo_articulo: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: 'tipo_articulos',
      key: 'id_tipo_articulo'
    }
  },
  service_tag: {
    type: DataTypes.STRING,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  num_serie: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Inventario',
  tableName:"inventarios"
});

module.exports = Inventario