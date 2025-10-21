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
    await queryInterface.bulkInsert('job_listing', [
      {
        project_id: 1,
        created_by: 2,
        qualification: `• Bachelor's Degree in Computer Science, Information Technology, or related field\n
                        • Strong knowledge of JavaScript, React.js, and Node.js\n
                        • Experience with RESTful APIs and database management`,
        responsibilities: `• Develop, test, and maintain web applications\n
                           • Collaborate with backend developers and UI/UX designers\n
                           • Optimize applications for maximum performance`,
        location: "Cebu City, Cebu",
        contract_type: "Full-time",
        experience_level: "Mid Level",
        salary: "$1500 - $2500",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 2,
        created_by: 1,
        qualification: `• Master's Degree in Business Administration or related field\n
                        • Strong leadership and analytical skills\n
                        • Proven experience in business strategy development`,
        responsibilities: `• Lead business development initiatives\n
                           • Manage project planning and execution\n
                           • Oversee budgeting and financial forecasting`,
        location: "Makati City, Manila",
        contract_type: "Full-time",
        experience_level: "Senior Level",
        salary: "$4000 - $6000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 2,
        created_by: 1,
        qualification: `• Bachelor's Degree in Information Technology, Computer Engineering, or related field\n
                        • Knowledge of IT infrastructure and cybersecurity\n
                        • Experience with cloud computing platforms`,
        responsibilities: `• Manage IT infrastructure and ensure cybersecurity compliance\n
                           • Troubleshoot hardware and software issues\n
                           • Implement and maintain cloud solutions`,
        location: "Davao City, Davao",
        contract_type: "Permanent",
        experience_level: "Mid Level",
        salary: "$2200 - $3000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 1,
        created_by: 2,
        qualification: `• High School Diploma or equivalent\n
                        • Strong communication and problem-solving skills\n
                        • Previous customer service experience is a plus`,
        responsibilities: `• Handle customer inquiries and complaints via phone, chat, and email\n
                           • Provide technical support and troubleshooting\n
                           • Maintain accurate records of customer interactions`,
        location: "Quezon City, Manila",
        contract_type: "Part-time",
        experience_level: "Entry Level",
        salary: "$600 - $1200",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 1,
        created_by: 1,
        qualification: `• Bachelor's Degree in Accounting, Finance, or Business Administration\n
                        • Proficiency in financial analysis and reporting\n
                        • Knowledge of accounting software such as QuickBooks or Xero`,
        responsibilities: `• Prepare financial reports and manage bookkeeping\n
                           • Analyze financial data and ensure compliance with regulations\n
                           • Assist with budgeting and forecasting`,
        location: "Bacolod City, Negros Occidental",
        contract_type: "Contractual",
        experience_level: "Mid Level",
        salary: "$900 - $1400",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 2,
        created_by: 2,
        qualification: `• Bachelor's Degree in Marketing, Business, or Communications\n
                        • Experience in social media marketing and SEO\n
                        • Strong analytical and creative thinking skills`,
        responsibilities: `• Develop and execute digital marketing campaigns\n
                           • Monitor and analyze marketing metrics\n
                           • Optimize content for SEO and audience engagement`,
        location: "Taguig City, Manila",
        contract_type: "Full-time",
        experience_level: "Mid Level",
        salary: "$1800 - $3200",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 1,
        created_by: 1,
        qualification: `• Bachelor's Degree in Civil Engineering\n
                        • Licensed Civil Engineer preferred\n
                        • Experience with construction project management`,
        responsibilities: `• Supervise construction projects and site inspections\n
                           • Ensure compliance with safety regulations\n
                           • Manage project timelines and budgets`,
        location: "Cebu City, Cebu",
        contract_type: "Full-time",
        experience_level: "Senior Level",
        salary: "$3500 - $5000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 2,
        created_by: 2,
        qualification: `• Bachelor's Degree in Graphic Design, Fine Arts, or related field\n
                        • Proficiency in Adobe Creative Suite (Photoshop, Illustrator, etc.)\n
                        • Strong portfolio showcasing design work`,
        responsibilities: `• Design branding materials and marketing graphics\n
                           • Create UI/UX designs for web and mobile applications\n
                           • Collaborate with marketing and development teams`,
        location: "Pasig City, Manila",
        contract_type: "Freelance",
        experience_level: "Mid Level",
        salary: "$1200 - $2000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 1,
        created_by: 2,
        qualification: `• Bachelor's Degree in Human Resources, Business, or Psychology\n
                        • Strong understanding of recruitment and employee relations\n
                        • Experience in HR software and compliance regulations`,
        responsibilities: `• Manage recruitment and onboarding processes\n
                           • Oversee employee relations and performance management\n
                           • Ensure compliance with labor laws and company policies`,
        location: "Davao City, Davao",
        contract_type: "Full-time",
        experience_level: "Mid Level",
        salary: "$2000 - $3000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        project_id: 2,
        created_by: 1,
        qualification: `• Bachelor's Degree in Journalism, Communications, or English\n
                        • Strong writing and editing skills\n
                        • Experience in news reporting or content creation`,
        responsibilities: `• Write and edit news articles and blog content\n
                           • Conduct research and interviews for articles\n
                           • Ensure content accuracy and SEO optimization`,
        location: "Manila, Metro Manila",
        contract_type: "Full-time",
        experience_level: "Mid Level",
        salary: "$1800 - $2500",
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
