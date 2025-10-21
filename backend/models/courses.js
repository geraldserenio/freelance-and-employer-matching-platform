"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Courses extends Model {}

  Courses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      user_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reviews: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tag: {
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
      modelName: "Courses",
      tableName: "courses",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  Courses.associate = (models) => {
    Courses.belongsTo(models.User, {
      as: "course_user",
      foreignKey: "user_id",
    });
  };

  return Courses;
};
