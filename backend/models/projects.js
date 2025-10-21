"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Define associations for the Project model.
     */
    static associate(models) {
      // Associate Project with the User model for the "business" field.
      Project.belongsTo(models.User, {
        as: "businessUser",
        foreignKey: "business",
        onDelete: "CASCADE",
      });

      Project.hasMany(models.JobListing, {
        foreignKey: "project_id",
        as: "job_listings",
        onDelete: "CASCADE",
      });

      Project.hasMany(models.Reviews, {
        as: "reviews",
        foreignKey: "project_id",
      });

      Project.hasMany(models.ProjectSkillRequired, {
        as: "requiredSkills",
        foreignKey: "project_id",
        onDelete: "CASCADE",
      });

      Project.hasMany(models.ProjectApplicants, {
        as: "project_applicants",
        foreignKey: "project_id",
      });

      Project.hasMany(models.ProjectMilestone, {
        as: "project_milestones",
        foreignKey: "project_id",
      });
    }
  }

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      business: {
        //user id
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timeline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_terms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payment_conditions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deadline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contract_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      experience_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      years_of_experience: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: true,
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
        defaultValue: sequelize.literal("now()"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("now()"),
      },
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "projects",
      timestamps: true,
      underscored: true,
      createdAt: false,
      updatedAt: "updated_at",
    }
  );

  return Project;
};
