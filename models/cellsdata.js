'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CellsData extends Model {

    static associate({ OutputData, ConstData }) {
      this.hasMany(OutputData, { foreignKey: 'cellsId', as: 'cells' })
      this.hasMany(ConstData, { foreignKey: 'cellsId', as: 'cellsConst' })
    }

    toJSON() {
      return { ...this.get(), cellsId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };
  CellsData.init({
    cellsId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    cellsIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsFirstFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsSecondFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsThridFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsFourthFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsFifthFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsSixthFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'cellsData',
    modelName: 'CellsData',
  });
  return CellsData;
};