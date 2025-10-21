'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProjectSkillRequired extends Model {

    static associate(models) {
    ProjectSkillRequired.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'project',
        onDelete: 'CASCADE',
      });
      
      ProjectSkillRequired.belongsTo(models.Skill, {
        foreignKey: 'skill_id',
        as: 'skill',
        onDelete: 'CASCADE',
      });
    }
  }

  ProjectSkillRequired.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'skills',
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
    },
    {
      sequelize,
      modelName: 'ProjectSkillRequired',
      tableName: 'project_skill_required',
      timestamps: false,
      underscored: true,
    }
  );

  return ProjectSkillRequired;
};
