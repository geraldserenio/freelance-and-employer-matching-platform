"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Reviews extends Model {}

  Reviews.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      stars: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reviews: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Reviews",
      tableName: "reviews",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.User, {
      as: "freelance",
      foreignKey: "user_id",
    });

    Reviews.belongsTo(models.Project, {
      foreignKey: "project_id",
      as: "project_reviews",
    });
  };

  return Reviews;
};
