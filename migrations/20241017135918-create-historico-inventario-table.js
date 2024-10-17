'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HistoricoInventario', {
      id_historico: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_inventario: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_sede_origen: {
        type: Sequelize.UUID,
      },
      id_sede_destino: {
        type: Sequelize.UUID,
      },
      id_remito: {
        type: Sequelize.UUID,
      },
      fecha_movimiento: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HistoricoInventario');
  },
};

