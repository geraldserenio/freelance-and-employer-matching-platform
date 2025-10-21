'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class JobApplicant extends Model { }

    JobApplicant.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        applicant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        resume: {
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
            defaultValue: sequelize.fn('now'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        sequelize,
        modelName: 'JobApplicant',
        tableName: 'job_applicants',
        timestamps: false,
        underscored: true,  // Use snake_case for column names
    });

    JobApplicant.associate = (models) => {
        JobApplicant.belongsTo(models.JobListing, {
            as: 'job_listings_for_freelancer',
            foreignKey: 'job_listing_id',
        });

        JobApplicant.belongsTo(models.User, {
            as: 'applicants',
            foreignKey: 'applicant_id',
        });
    }

    return JobApplicant;
};