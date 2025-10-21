'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Skill extends Model { }

  Skill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      skill_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
    },
    {
      sequelize,
      modelName: 'Skill',
      tableName: 'skills',
      timestamps: false,
      underscored: true,
    }
  );

  Skill.associate = (models) => {
    Skill.belongsTo(models.User, {
      as: 'skills',
      foreignKey: 'user_id',
    });
  }
  return Skill;
};
