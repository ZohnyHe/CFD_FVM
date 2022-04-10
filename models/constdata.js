'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConstData extends Model {

    static associate({ PointsData, FacesData, CellsData }) {
      this.belongsTo(PointsData, { foreignKey: 'pointsDataId', as: 'point' });
      this.belongsTo(FacesData, { foreignKey: 'facesDataId', as: 'faces' });
      this.belongsTo(CellsData, { foreignKey: 'cellsId', as: 'cellsConst' });
    }

    toJSON() {
      return { ...this.get(),  pointsDataId: undefined, facesDataId: undefined,
                neighbourDataId: undefined, ownerDataId: undefined, cellsId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };

  ConstData.init({
    constDataId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    pointsDataId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    facesDataId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    neighbourDataId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    ownerDataId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    cellsId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'constData',
    modelName: 'ConstData',
  });
  return ConstData;
};