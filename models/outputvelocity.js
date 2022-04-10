'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutputVelocity extends Model {

    static associate({ OutputData }) {
      this.hasMany(OutputData, { foreignKey: 'velocityId', as: 'velocity' })
    }

    toJSON() {
      return { ...this.get(), velocityId: undefined, createdAt: undefined, updatedAt: undefined }
    }

  };
  OutputVelocity.init({
    velocityId: {
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    velocityX: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    velocityY: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    velocityZ: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'outputVelocity',
    modelName: 'OutputVelocity',
  });
  return OutputVelocity;
};