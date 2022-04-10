'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutputTime extends Model {

    static associate({ OutputData }) {
      this.hasMany(OutputData, { foreignKey: 'timeId', as: 'time' })
    }

    toJSON() {
      return { ...this.get(), timeId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };
  OutputTime.init({
    timeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    timeStep: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'outputTime',
    modelName: 'OutputTime',
  });
  return OutputTime;
};