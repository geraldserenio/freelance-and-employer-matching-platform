"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("programs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_audience: {
        type: Sequelize.ARRAY(
          Sequelize.ENUM("HIGH_SCHOOL_STUDENTS", "UNIVERSITY_STUDENTS")
        ),
        allowNull: true,
      },
      weekly_duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hourly_duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      delivery_method: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
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
  },
};
