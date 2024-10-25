'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('remito_inventario', {
      id_remito_inventario: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_remito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'remitos',
          key: 'id_remito',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_inventario: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'inventarios',
          key: 'id_inventario',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      es_prestamo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      fecha_devolucion: {
        type: Sequelize.DATE,
      },
      devuelto: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('remito_inventario');
  },
};
