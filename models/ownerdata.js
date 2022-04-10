'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnerData extends Model {

    toJSON() {
      return { ...this.get(), ownerDataId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };
  OwnerData.init({
    ownerDataId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    externalFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsIndexExternalFacesBelongsTo: {
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
    tableName: 'ownerData',
    modelName: 'OwnerData',
  });
  return OwnerData;
};