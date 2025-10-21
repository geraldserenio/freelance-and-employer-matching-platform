'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('workshop_benefits', [
      {
        title: 'Interactive learning',
        description: 'Engaging. hands-on sessions tailored to real-world scenarios ',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Experienced instructors ',
        description: 'Industry professional with expertise in their fields',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Affordable pricing',
        description: 'High quality workshops at competitive rates',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('workshop_benefits', null, {});
  }
};
