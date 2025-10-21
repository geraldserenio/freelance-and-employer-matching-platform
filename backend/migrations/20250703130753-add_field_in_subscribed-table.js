"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("subscribed", "country", {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("subscribed", "email", {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("subscribed", "card_ending_digits", {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("subscribed", "amount", {
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
  },
};
