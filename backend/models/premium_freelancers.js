'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PremiumFreelancers extends Model { }

  PremiumFreelancers.init({
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
    modelName: 'PremiumFreelancers',
    tableName: 'premium_freelancers',
    timestamps: false,
    underscored: true,  // Use snake_case for column names
  });

  PremiumFreelancers.associate = (models) => {
    PremiumFreelancers.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'user_id',
    });
  };

  return PremiumFreelancers;
};