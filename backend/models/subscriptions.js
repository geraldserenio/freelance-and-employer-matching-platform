'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Subscriptions extends Model { }

  Subscriptions.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_recommended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'Subscriptions',
    tableName: 'subscriptions',
    timestamps: false,
    underscored: true,  // Use snake_case for column names
  });

  Subscriptions.associate = (models) => {
    Subscriptions.hasMany(models.SubscriptionInclusions, {
      as: 'subscription_inclusions',
      foreignKey: 'subscription_id',
    });
  };

  return Subscriptions;
};