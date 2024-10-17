'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Remito', {
      id_remito: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_sede_origen: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_sede_destino: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_tecnico: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      observaciones: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Remito');
  },
};
