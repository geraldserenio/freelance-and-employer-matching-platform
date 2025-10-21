'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SubscriptionInclusions extends Model { }

  SubscriptionInclusions.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subscriptions', // Reference to the User model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
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
    modelName: 'SubscriptionInclusions',
    tableName: 'subscription_inclusions',
    timestamps: false,
    underscored: true,  // Use snake_case for column names
  });

  SubscriptionInclusions.associate = (models) => {
    SubscriptionInclusions.belongsTo(models.Subscriptions, {
      as: 'subscriptions',
      foreignKey: 'subscription_id',
    });
  }

  return SubscriptionInclusions;
};