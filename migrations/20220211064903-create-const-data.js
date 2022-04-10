'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ConstData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      constId: {
        type: DataTypes.STRING
      },
      pointsDataId: {
        type: DataTypes.STRING
      },
      facesDataId: {
        type: DataTypes.STRING
      },
      neighbourDataId: {
        type: DataTypes.STRING
      },
      ownerDataId: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ConstData');
  }
};