"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProjectMilestone extends Model {}

  ProjectMilestone.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      project_applicants_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "project_applicants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      project_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      read: {
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
      modelName: "ProjectMilestone",
      tableName: "project_milestone",
      timestamps: false,
      underscored: true,
    }
  );

  ProjectMilestone.associate = (models) => {
    ProjectMilestone.belongsTo(models.ProjectApplicants, {
      as: "project_milestone_for_freelancer",
      foreignKey: "project_applicants_id",
    });
  };

  return ProjectMilestone;
};
