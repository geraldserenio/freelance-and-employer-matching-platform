"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProjectApplicants extends Model {}

  ProjectApplicants.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "projects", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      portfolio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timeline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("now"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("now"),
      },
    },
    {
      sequelize,
      modelName: "ProjectApplicants",
      tableName: "project_applicants",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  ProjectApplicants.associate = (models) => {
    ProjectApplicants.belongsTo(models.Project, {
      as: "project_gig_details",
      foreignKey: "project_id",
    });

    ProjectApplicants.belongsTo(models.User, {
      as: "gig_applicants",
      foreignKey: "applicant_id",
    });
  };

  return ProjectApplicants;
};
