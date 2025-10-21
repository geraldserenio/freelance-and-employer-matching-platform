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
    await queryInterface.bulkInsert('projects', [
      {
        project_name: 'E-Commerce Platform Development',
        project_description: 'Develop a scalable e-commerce website with payment integration and user management.',
        business: 6,
        deadline: '12/15/2025',
        payment_terms: 'Milestone-based',
        payment_conditions: '50% upfront, 50% upon completion',
        status: 'in_progress',
        timeline: '4/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'Business Strategy Expansion',
        project_description: 'Develop and implement a business expansion strategy for international markets.',
        business: 7,
        deadline: '06/30/2026',
        payment_terms: 'By milestone',
        payment_conditions: '30% upon project start, 70% after final approval',
        status: 'not_started',
        timeline: '3/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'IT Infrastructure Overhaul',
        project_description: 'Upgrade company IT infrastructure to enhance security and cloud storage capabilities.',
        business: 6,
        deadline: '03/01/2026',
        payment_terms: 'Monthly payments',
        payment_conditions: 'Invoices due within 15 days of issue',
        status: 'in_progress',
        timeline: '5/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'Customer Support Optimization',
        project_description: 'Implement AI-powered customer support chatbots to improve response times.',
        business: 7,
        deadline: '10/20/2025',
        payment_terms: 'By milestone',
        payment_conditions: '25% upfront, 75% upon implementation',
        status: 'in_progress',
        timeline: '3/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'Financial Auditing and Compliance',
        project_description: 'Perform an in-depth financial audit to ensure compliance with regulations.',
        business: 6,
        deadline: '11/30/2025',
        payment_terms: 'By milestone',
        payment_conditions: 'Payment upon each phase completion',
        status: 'not_started',
        timeline: '2/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'Digital Marketing Campaign',
        project_description: 'Launch a digital marketing campaign targeting social media and search engines.',
        business: 7,
        deadline: '09/10/2025',
        payment_terms: 'By milestone',
        payment_conditions: '40% upfront, 60% upon final report',
        status: 'completed',
        timeline: '5/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'Commercial Building Construction',
        project_description: 'Manage and oversee the construction of a 10-story commercial building.',
        business: 6,
        deadline: '05/25/2027',
        payment_terms: 'By milestone',
        payment_conditions: 'Payments based on construction phases',
        status: 'in_progress',
        timeline: '6/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'Brand Identity Revamp',
        project_description: 'Redesign brand assets, including logo, packaging, and promotional materials.',
        business: 7,
        deadline: '07/15/2025',
        payment_terms: 'By milestone',
        payment_conditions: '50% upfront, 50% upon completion',
        status: 'completed',
        timeline: '3/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'HR Management System Development',
        project_description: 'Develop an internal HR management software with employee tracking and payroll integration.',
        business: 6,
        deadline: '02/20/2026',
        payment_terms: 'By milestone',
        payment_conditions: '30% deposit, 70% after final testing',
        status: 'in_progress',
        timeline: '4/week',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_name: 'Content and Journalism Expansion',
        project_description: 'Expand online journalism coverage by hiring freelance writers and reporters.',
        business: 7,
        deadline: '08/26/2026',
        payment_terms: 'By monthly',
        payment_conditions: 'Monthly invoices for completed content',
        status: 'in_progress',
        timeline: '2/week',
        created_at: new Date(),
        updated_at: new Date(),
      }
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
