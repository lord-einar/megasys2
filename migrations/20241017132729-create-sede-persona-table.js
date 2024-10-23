'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sede_persona', {
      id_sedePersona: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_sede: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_persona: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_rol: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      fecha_asignacion: {
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
    await queryInterface.dropTable('sede_persona');
  },
};
