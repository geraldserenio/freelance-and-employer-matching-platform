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

    await queryInterface.addColumn("project_gig_payments", "amount_sent", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "0",
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("project_gig_payments", "sent_status", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "unsent",
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("project_gig_payments", "admin_percentage", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "15%",
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
