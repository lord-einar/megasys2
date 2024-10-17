const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnect");

class Remito extends Model {}

Remito.init({
  id_remito: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_sede: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Sedes',
      key: 'id_sede'
    }
  },
  id_persona: {
    type: DataTypes.UUID,
    references: {
      model: 'Personas',
      key: 'id_persona'
    }
  },
  id_user: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id_user'
      }
  },
  fecha_remito: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Remito',
  tableName: 'remitos'
});

module.exports = Remito;
