"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Experience extends Model {}

  Experience.init(
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
          model: "users", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      experience_name: {
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
      modelName: "Experience",
      tableName: "experiences",
      timestamps: false,
      underscored: true,
    }
  );

  Experience.associate = (models) => {
    Experience.belongsTo(models.User, {
      as: "experiences",
      foreignKey: "user_id",
    });
  };
  return Experience;
};
