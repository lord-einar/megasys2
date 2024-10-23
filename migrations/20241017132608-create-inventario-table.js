'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventarios', {
      id_inventario: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_sede: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_marca: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_tipo_articulo: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      service_tag: {
        type: Sequelize.STRING,
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      num_serie: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: 'disponible',
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
    await queryInterface.dropTable('inventarios');
  },
};