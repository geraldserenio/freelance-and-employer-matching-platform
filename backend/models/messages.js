"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Messages extends Model {}

  Messages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      recipient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Reference to the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: "Messages",
      tableName: "messages",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  Messages.associate = (models) => {
    Messages.belongsTo(models.User, {
      as: "senderId",
      foreignKey: "sender",
    });

    Messages.belongsTo(models.User, {
      as: "recipientId",
      foreignKey: "recipient",
    });
  };

  return Messages;
};
