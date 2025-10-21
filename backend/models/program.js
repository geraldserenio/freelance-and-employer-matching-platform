'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Program extends Model {}

  Program.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(1000), 
      allowNull: true, 
    },
    target_audience: {
      type: DataTypes.ARRAY(DataTypes.ENUM('HIGH_SCHOOL_STUDENTS', 'UNIVERSITY_STUDENTS')),
      allowNull: true,
    },
    weekly_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hourly_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    delivery_method: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
    }
  }, {
    sequelize,
    modelName: 'Program',
    tableName: 'programs',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: 'updated_at',
  });

  return Program;
};
