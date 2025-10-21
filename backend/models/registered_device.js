'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class RegisteredDevice extends Model { }

  RegisteredDevice.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Reference to the User model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'RegisteredDevice',
    tableName: 'registered_device',
    timestamps: false,
    underscored: true,  // Use snake_case for column names
  });

  return RegisteredDevice;
};