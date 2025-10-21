'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Benefits extends Model { }

  Benefits.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    },
  }, {
    sequelize,
    modelName: 'Benefits',
    tableName: 'benefits',
    timestamps: false,
    underscored: true,  // Use snake_case for column names
  });

  return Benefits;
};