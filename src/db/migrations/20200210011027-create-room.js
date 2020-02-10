'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shulId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "Shuls",
          key: "id",
          as: "shulId"
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      visAudScore: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isCentered: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isSameFloorSide: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isSameFloorBack: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isSameFloorElevated: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isSameFloorLevel: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isBalconySide: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isBalconyBack: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isOnlyMen: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isMixedSeating: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rooms');
  }
};
