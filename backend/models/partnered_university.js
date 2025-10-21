'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PartneredUniversity extends Model {}

  PartneredUniversity.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    university_logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_name: {
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
    modelName: 'PartneredUniversity',
    tableName: 'partnered_universities',
    timestamps: true,   // Enables Sequelize's auto-timestamps
    underscored: true,
    createdAt: false,   // Prevents Sequelize from auto-managing `createdAt`
    updatedAt: 'updated_at',  // Maps Sequelize's `updatedAt` to `updated_at`
  });

  return PartneredUniversity;
};
