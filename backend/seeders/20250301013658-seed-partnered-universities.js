'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('partnered_universities', [
      {
        university_logo: 'https://example.com/logos/harvard.png',
        university_name: 'Harvard University',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        university_logo: 'https://example.com/logos/stanford.png',
        university_name: 'Stanford University',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        university_logo: 'https://example.com/logos/mit.png',
        university_name: 'Massachusetts Institute of Technology',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        university_logo: 'https://example.com/logos/oxford.png',
        university_name: 'University of Oxford',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        university_logo: 'https://example.com/logos/cambridge.png',
        university_name: 'University of Cambridge',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        university_logo: 'https://example.com/logos/yale.png',
        university_name: 'Yale University',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
