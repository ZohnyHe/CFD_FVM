'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutputData extends Model {

    static associate({ CellsData, OutputTime, OutputTemperature, OutputVelocity }) {
      this.belongsTo(CellsData, { foreignKey: 'cellsId', as: 'cells' });
      this.belongsTo(OutputTime, { foreignKey: 'timeId', as: 'time' });
      this.belongsTo(OutputTemperature, { foreignKey: 'temperatureId', as: 'temperature' });
      this.belongsTo(OutputVelocity, { foreignKey: 'velocityId', as: 'velocity' });
    }

    toJSON() {
      return { ...this.get(),
        cellsId: undefined, timeId: undefined, temperatureId: undefined, velocityId: undefined, createdAt: undefined, updatedAt: undefined }
    }
  };
  OutputData.init({
    dataId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    cellsId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    timeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    temperatureId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    velocityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'outputData',
    modelName: 'OutputData',
  });
  return OutputData;
};