'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutputTemperature extends Model {

    static associate({ OutputData }) {
      this.hasMany(OutputData, { foreignKey: 'temperatureId', as: 'temperature' })
    }

    toJSON() {
      return { ...this.get(), temperatureId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };
  OutputTemperature.init({
    temperatureId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    temperatureKelvin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperatureCelsius: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'outputTemperature',
    modelName: 'OutputTemperature',
  });
  return OutputTemperature;
};