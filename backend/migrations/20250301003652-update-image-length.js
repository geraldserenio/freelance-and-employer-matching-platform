module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('programs', 'image', {
      type: Sequelize.STRING(1000), // Increase limit from 255 to 1000
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {

  }
};
