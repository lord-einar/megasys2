const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Historico extends Model {}

  Historico.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      entidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_entidad: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Historico',
      tableName: 'historico',
      timestamps: false,
    }
  );

  return Historico;
};
