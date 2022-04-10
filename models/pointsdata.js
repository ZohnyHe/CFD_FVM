'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PointsData extends Model {

    static associate({ ConstData }) {
      this.hasMany(ConstData, { foreignKey: 'pointsDataId', as: 'point' })
    }
    

    toJSON() {
      return { ...this.get(), pointsDataId: undefined,createdAt: undefined, updatedAt: undefined }
    }

  };
  
  PointsData.init({
    pointsDataId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    pointsIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pointsXcoordinate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pointsYcoordinate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pointsZcoordinate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'pointsData',
    modelName: 'PointsData',
  });
  return PointsData;
};