'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Payment extends Model { }

  Payment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_listing',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    freelancer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('sent', 'viewed', 'approved', 'completed', 'declined', "returned_to_client"),
      allowNull: true,
      defaultValue: 'sent',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
    },
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: false,
    underscored: true,  // Use snake_case for column names
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.JobListing, {
      as: 'job_listings',
      foreignKey: 'job_listing_id',
    });

    Payment.belongsTo(models.User, {
      as: 'payment_freelancers',
      foreignKey: 'freelancer_id',
    });
  }

  return Payment;
};