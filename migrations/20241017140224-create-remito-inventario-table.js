'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('remito_inventario', {
      id_remito_inventario: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_remito: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'remitos',
          key: 'id_remito',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_inventario: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'inventarios',
          key: 'id_inventario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('remito_inventario');
  },
};
