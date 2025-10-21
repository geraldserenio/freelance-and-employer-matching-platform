"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      job_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      years_of_experience: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      experience_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      stripe_account: {
        type: DataTypes.STRING,
        allowNull: true,
        // Optional: Specify where to add the column
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_first_time_logged_in: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      step: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onDelete: "CASCADE",
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
      modelName: "User",
      tableName: "users",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Skill, {
      as: "skills",
      foreignKey: "user_id",
    });

    User.hasMany(models.Experience, {
      as: "experiences",
      foreignKey: "user_id",
    });

    User.hasMany(models.Reviews, {
      as: "reviews",
      foreignKey: "user_id",
    });
  };

  return User;
};
