'use strict';

const { DataTypes } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Output_cells_data', {
      Cellid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      T: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ux: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Uy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Uz: {
        type: DataTypes.STRING,
        allowNull: false,
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
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Output_cells_data');
  }
};