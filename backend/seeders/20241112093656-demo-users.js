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
     * npx sequelize-cli seed:generate --name seed-jobs
     * npx sequelize-cli db:seed --seed 20250312122719-seed-projects.js
     * npx sequelize-cli db:seed:undo --seed 20250312122719-seed-projects.js
    */
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'super',
        middle_name: 'M',
        last_name: 'user',
        address: '123 Main St',
        mobile: '1234567890',
        email: 'geraldserenio@yahoo.com',
        user_type: 'business',
        password: '$2a$10$5OyCOOu7YdwIB1KF7mg3EOPcE8LInhDm0HFetp9m5v3ijiP9i0zfS',  //gTeampassword
        job_title: 'Web Developer + Killer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'client',
        middle_name: 'A',
        last_name: 'Smith',
        address: '456 Side St',
        mobile: '9876543210',
        email: 'hannalocca@gmail.com',
        user_type: 'business',
        job_title: 'Web Developer',
        password: '$2a$10$5OyCOOu7YdwIB1KF7mg3EOPcE8LInhDm0HFetp9m5v3ijiP9i0zfS', //gTeampassword
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Khalid',
        middle_name: '',
        last_name: '',
        address: '456 Side St',
        mobile: '9876543210',
        email: 'Khalid@gmail.com',
        user_type: 'freelancers',
        job_title: 'Web Developer',
        photo: 'Khalid',
        password: '$2a$10$5OyCOOu7YdwIB1KF7mg3EOPcE8LInhDm0HFetp9m5v3ijiP9i0zfS', //gTeampassword
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Sarah',
        middle_name: '',
        last_name: '',
        address: '456 Side St',
        mobile: '9876543210',
        email: 'Sarah@gmail.com',
        user_type: 'freelancers',
        job_title: 'Web Developer',
        photo: 'Sarah',
        password: '$2a$10$5OyCOOu7YdwIB1KF7mg3EOPcE8LInhDm0HFetp9m5v3ijiP9i0zfS', //gTeampassword
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Maryan',
        middle_name: '',
        last_name: '',
        address: '456 Side St',
        mobile: '9876543210',
        email: 'Maryan@gmail.com',
        user_type: 'freelancers',
        job_title: 'Web Developer',
        photo: 'Maryan',
        password: '$2a$10$5OyCOOu7YdwIB1KF7mg3EOPcE8LInhDm0HFetp9m5v3ijiP9i0zfS', //gTeampassword
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add more users if necessary
    ], {});
  },

  //npx sequelize-cli db:seed:all

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
