"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class FreelancerBenefits extends Model {}

  FreelancerBenefits.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
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
      modelName: "FreelancerBenefits",
      tableName: "freelancers_benefits",
      timestamps: false,
      underscored: true, // Use snake_case for column names
    }
  );

  return FreelancerBenefits;
};
