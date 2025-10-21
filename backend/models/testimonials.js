'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Testimonials extends Model { }

  Testimonials.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    testimony: {
      type: DataTypes.STRING,
      allowNull: true,
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
    is_student: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'Testimonials',
    tableName: 'testimonials',
    timestamps: false,
    underscored: true,  // Use snake_case for column names
  });

  Testimonials.associate = (models) => {
    Testimonials.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'user_id',
    });
  };

  return Testimonials;
};