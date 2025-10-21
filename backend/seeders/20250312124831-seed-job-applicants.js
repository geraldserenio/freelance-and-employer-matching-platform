'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('job_applicants', [
      {
        job_listing_id: 41,
        applicant_id: 3,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 41,
        applicant_id: 4,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 42,
        applicant_id: 5,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        job_listing_id: 43,
        applicant_id: 3,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 44,
        applicant_id: 4,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 45,
        applicant_id: 5,
        resume: 'user',
        status: 'in_progress',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        job_listing_id: 46,
        applicant_id: 3,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 47,
        applicant_id: 4,
        resume: 'user',
        status: 'rejected',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 48,
        applicant_id: 5,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 49,
        applicant_id: 3,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 50,
        applicant_id: 4,
        resume: 'user',
        status: 'hired',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_listing_id: 41,
        applicant_id: 5,
        resume: 'user',
        status: 'rejected',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add more users if necessary
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
