"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Subscribed extends Model {}

  Subscribed.init(
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
      subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "subscriptions", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripe_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
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
      modelName: "Subscribed",
      tableName: "subscribed",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  return Subscribed;
};
