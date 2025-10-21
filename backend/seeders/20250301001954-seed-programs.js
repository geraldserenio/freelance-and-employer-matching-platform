'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('programs', [
      {
        image: 'https://s3-alpha-sig.figma.com/img/cb07/6c83/3b81cb6c534d8ee58caffe590dfb6bd7?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=E4STB7AEjhQ~SAqQrxqwd~PfFzkwdspRUoNpjT~ITubbfeynKed6xwV-VOSnUOO0KUC-ejMWma1wE08dm8eT~fYhmy~tS8zX0a6XU-tB6~HZxCTPpJcHRbJvr2vu3k39BR6tvP2iouTWrFXFAS0vHZ-EG8~A6h7HVOj9Kedr7Oh7cpDf4To21FXpiFAHcQolMdx0Nfymp7x2gpaGuGter311efrt9T8ZDZ3UxLiD1AucrmF2BSwao5vS5WXBahNP5D3omo4odu1KhaKLMpSKoZp4warW6KeBe9rcgLUSdUm~iTvAfI1zy9HrPqx40Ulz4GL77IPy0CzFDLRzsxJAbw__',
        title: 'Beginner Coding Bootcamp',
        target_audience: Sequelize.literal("ARRAY['HIGH_SCHOOL_STUDENTS', 'UNIVERSITY_STUDENTS']::enum_programs_target_audience[]"),
        weekly_duration: 8,
        hourly_duration: 2,
        delivery_method: ['ONLINE', 'IN_PERSON'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image: 'https://s3-alpha-sig.figma.com/img/73fd/0823/2579187c094de47770946875ede3c7ab?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=f42cB6Nno2~ZitCgW9kWp64m2-CTl9J0337uAUt6iUnoxGoW~wDOlE-YpDf1FzN-Pu~ZbssR8WQtrnOs99cW70y4pIzuE1zv1veOyyggiwdhvyYeV5kIcIHFId7QhNExmFik9q~l1-AKFMK-8WSUYHBjREUDDNWwGTX4mTTnOg9mqCGov-db6B0PbXEi5jgPFHpprpM~0bdEwcQfdJXBR3W4zimGk7uWFRAuAggUh-a3SKqiRJU7uoYjYWas~JLybR172RhzAIsu8xg79Pk9VRTwZhqx3788~~GG1hjmrOBm-EYLXKvJl2UpQD0rvgNhtqZASs3Fy1VU9U~de16Zbw__',
        title: 'AI & Machine Learning Workshop',
        target_audience: Sequelize.literal("ARRAY['HIGH_SCHOOL_STUDENTS', 'UNIVERSITY_STUDENTS']::enum_programs_target_audience[]"),
        weekly_duration: 10,
        hourly_duration: 3,
        delivery_method: ['ONLINE'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image: 'https://s3-alpha-sig.figma.com/img/ce67/1e14/e4c655c9e4548226b4d378fd9e378d1e?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PdmHrWiVwB5FR5eJ8uJbnbiSkT5dJCnDnrkI4R1mNedDIm0X4EMySEiTIWzUV9u-o4-BCNPMZcfnBXL2BqFWQDiXZ0vaK-rfwe9GsyE7QfsssYJ1waEmXpc8zhOXAnGxC~DnOaipPFKyEFkrHmh3oFUmib92KjhxN08CLJ5xB8rvFlzn69K0yzcUV4XMgSpQQ1xltud6yDhVSv4zSbSs-LICVUTbhuBbQZBhPyMJ3Zws0lGd-WJ2notMxx4rWe3l-fQwrnDXWmHo08cUPCZ3QbuU5ZwwPD7tYMtTOU6GLT-1kFgdl-yLmewLWvNfWph8UFwdoLTkgmOOq2Jv2Ybwkw__',
        title: 'Business Management Essentials',
        target_audience: Sequelize.literal("ARRAY['HIGH_SCHOOL_STUDENTS', 'UNIVERSITY_STUDENTS']::enum_programs_target_audience[]"),
        weekly_duration: 6,
        hourly_duration: 2,
        delivery_method: ['IN_PERSON', 'SELF_PACED'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image: 'https://s3-alpha-sig.figma.com/img/2e44/d315/67c0ad5bcfa0bbbafb88de709a58948e?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ItEMvn00RMnM5NPasoLpeYywNeuMPNYJpTbc2Mt~D6J8RMOym4ofAuRQfdE7nFR074pqvdNu1fy4UaXwm-gWvRXA9LEhtmol5v9gM4bDZ8qTC62clAsK~--RhBD1ldFAk4z7LCqzXW6HI45tpYGyw4V3LdkPCCoDSDNs2Borm-jQ~08aodos57oILS83tyJ8hmZ23lgO3brx9vyPnrjWxnxJ-4PLPNqUxA9bjFABcSu6Eb4UfGCtbN3j1HtaBSBbVHaq0IphAB-1vFPSe~LEf-O9H0qF6QkvdlOPcCH-ZvLbLNFVYiS1TZKvW4qXSDaHvrSTX0tD8tG8Tx92jOc7Bw__',
        title: 'AI & Machine Learning Workshop',
        target_audience: Sequelize.literal("ARRAY['HIGH_SCHOOL_STUDENTS', 'UNIVERSITY_STUDENTS']::enum_programs_target_audience[]"),
        weekly_duration: 10,
        hourly_duration: 3,
        delivery_method: ['ONLINE'],
        created_at: new Date(),
        updated_at: new Date(),
      },
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
