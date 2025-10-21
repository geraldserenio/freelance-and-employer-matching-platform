'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class JobListing extends Model { }

    JobListing.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        qualification: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        responsibilities: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contract_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        experience_level: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_external: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        external_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        work_setup: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        job_title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        exclusive: {
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
        modelName: 'JobListing',
        tableName: 'job_listing',
        timestamps: false,
        underscored: true,  // Use snake_case for column names
    });

    JobListing.associate = (models) => {
        JobListing.belongsTo(models.Project, {
            foreignKey: 'project_id',
            as: 'project'
        });

        JobListing.hasMany(models.JobApplicant, {
            as: 'job_applicants',
            foreignKey: 'job_listing_id',
        });

        JobListing.hasMany(models.Payment, {
            as: 'payments',
            foreignKey: 'job_listing_id',
        });

        JobListing.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'created_by',
        });
    };

    return JobListing;
};