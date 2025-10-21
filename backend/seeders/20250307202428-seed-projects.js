'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all business users
    const businessUsers = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE user_type = 'business';",
      { type: Sequelize.QueryTypes.SELECT }
    );



    // If no businesses or freelancers exist, skip seeding
    if (!businessUsers.length) return;

    const projects = businessUsers.map((business, index) => {
      return {
        project_name: `Project ${index + 1}`,
        business: business.id,
        deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_terms: 30,
        payment_conditions: 'Milestone-based',
        status: 'pending',
        is_recommended: false,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    await queryInterface.bulkInsert('projects', projects);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
