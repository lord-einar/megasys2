'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('remitos', {
      id_remito: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_sede: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sedes',
          key: 'id_sede',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_persona: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'personas',
          key: 'id_persona',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      id_user: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id_user',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      fecha_remito: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable('remitos');
  },
};
