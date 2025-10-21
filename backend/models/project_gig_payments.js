"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProjectGigPayments extends Model {}

  ProjectGigPayments.init(
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
          model: "users", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      project_milestone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "project_milestone", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      stripe_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_ending_digits: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
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
      sent_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transfer_id: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "ProjectGigPayments",
      tableName: "project_gig_payments",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  ProjectGigPayments.associate = (models) => {
    ProjectGigPayments.belongsTo(models.User, {
      as: "project_milestone_for_user",
      foreignKey: "user_id",
    });

    ProjectGigPayments.belongsTo(models.ProjectMilestone, {
      as: "project_milestone",
      foreignKey: "project_milestone_id",
    });
  };

  return ProjectGigPayments;
};
