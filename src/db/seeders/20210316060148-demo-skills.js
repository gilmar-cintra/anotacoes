'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('skills',
      [{
        skill: 'HTML',
        created: new Date(),
        updated: new Date()
      },
      {
        skill: 'CSS',
        created: new Date(),
        updated: new Date()
      },
      {
        skill: 'JavaScript',
        created: new Date(),
        updated: new Date()
      },
      {
        skill: 'TypeScript',
        created: new Date(),
        updated: new Date()
      }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('skills', null, {});
  }
};