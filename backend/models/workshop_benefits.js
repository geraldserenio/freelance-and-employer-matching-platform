'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class WorkshopBenefit extends Model {}

  WorkshopBenefit.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'), // `created_at` remains unchanged
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'), // Initial value
    }
  }, {
    sequelize,
    modelName: 'WorkshopBenefit',
    tableName: 'workshop_benefits',
    timestamps: true,   // Enables Sequelize's auto-timestamps
    underscored: true,
    createdAt: false,   // Prevents Sequelize from auto-managing `createdAt`
    updatedAt: 'updated_at',  // Maps Sequelize's `updatedAt` to `updated_at`
  });

  return WorkshopBenefit;
};
