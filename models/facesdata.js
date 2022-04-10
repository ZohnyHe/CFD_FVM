'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacesData extends Model {

    static associate({ ConstData }) {
      this.hasMany(ConstData, { foreignKey: 'facesDataId', as: 'faces' })
    }
    

    toJSON() {
      return { ...this.get(), facesDataId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };
  FacesData.init({
    facesDataId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    facesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facesFirstPointsIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facesSecondPointsIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facesThirdPointsIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facesFourthPointsIndex: {
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
    tableName: 'facesData',
    modelName: 'FacesData',
  });
  return FacesData;
};