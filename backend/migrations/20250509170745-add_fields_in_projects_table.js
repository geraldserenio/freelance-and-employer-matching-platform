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
    await queryInterface.addColumn('projects', 'contract_type', {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn('projects', 'experience_level', {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn('projects', 'years_of_experience', {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn('projects', 'salary', {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn('projects', 'location', {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn('users', 'experience_level', {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn('users', 'years_of_experience', {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
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
