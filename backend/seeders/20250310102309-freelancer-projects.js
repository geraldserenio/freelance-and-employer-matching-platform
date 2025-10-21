'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all freelancers
    const freelancers = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'freelancers';`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Fetch all projects
    const projects = await queryInterface.sequelize.query(
      `SELECT id FROM projects;`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Ensure we have data before inserting
    if (freelancers.length === 0 || projects.length === 0) {
      console.warn('No freelancers or projects found. Seeder will not run.');
      return;
    }

    // Assign projects to freelancers in a round-robin manner
    const seedData = [];
    freelancers.forEach((freelancer, index) => {
      projects.forEach((project) => {
        seedData.push({
          freelancer_id: freelancer.id,
          project_id: project.id,
          status: 'IN_PROGRESS',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    });

    // Insert seed data
    await queryInterface.bulkInsert('freelancer_projects', seedData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('freelancer_projects', null, {});
  }
};
