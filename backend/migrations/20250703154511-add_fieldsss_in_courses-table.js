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
    await queryInterface.addColumn("courses", "category", {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("courses", "reviews", {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("courses", "price", {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("courses", "tag", {
      type: Sequelize.STRING,
      allowNull: true,
      // Optional: Specify where to add the column
    });

    await queryInterface.addColumn("courses", "attachment", {
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
