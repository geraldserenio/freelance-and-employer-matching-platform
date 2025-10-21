'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      plan_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plan: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
      },
      rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('monthly', 'yearly'),
        allowNull: false,
      },
      user_type: {
        type: Sequelize.ENUM('freelancer', 'business'),
        allowNull: false,
      },
      is_recommended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
