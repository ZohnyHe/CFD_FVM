'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NeighbourData extends Model {

    toJSON() {
      return { ...this.get(), neighbourDataId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };
  NeighbourData.init({
    neighbourDataId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    internalFacesIndex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellsIndexInternalFacesBelongsTo: {
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
    tableName: 'neighbourData',
    modelName: 'NeighbourData',
  });
  return NeighbourData;
};