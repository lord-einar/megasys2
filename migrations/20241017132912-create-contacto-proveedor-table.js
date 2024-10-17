'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContactoProveedor', {
      id_contacto: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      id_proveedor: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Proveedor',
          key: 'id_proveedor',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nombre_contacto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nivel_soporte: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Nivel de soporte del contacto, por ejemplo, 1 para nivel 1, 2 para nivel 2, etc.',
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
    await queryInterface.dropTable('ContactoProveedor');
  },
};

