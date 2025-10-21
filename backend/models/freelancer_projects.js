'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FreelancerProject extends Model {
    /**
     * Define associations for the Project model.
     */
    static associate(models) {
      // Associate FreelancerProjects with the User model
      FreelancerProject.belongsTo(models.User, {
        as: 'freelancerUser',
        foreignKey: 'freelancer_id',
        onDelete: 'CASCADE',
      });

      // Associate FreelancerProjects with the Project model
      FreelancerProject.belongsTo(models.Project, {
        as: 'project',
        foreignKey: 'project_id',
        onDelete: 'CASCADE',
      });
    }
  }

  FreelancerProject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      freelancer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'IN_PROGRESS',
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      },
    },
    {
      sequelize,
      modelName: 'FreelancerProject',
      tableName: 'freelancer_projects',
      timestamps: true,
      underscored: true,
      createdAt: false,
      updatedAt: 'updated_at',
    }
  );

  return FreelancerProject;
};
