'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fields_types',
      [{
        type: 'Formação',
        created: new Date(),
        updated: new Date()
      },
      {
        type: 'Experiências',
        created: new Date(),
        updated: new Date()
      }, {
        type: 'Extracurriculares',
        created: new Date(),
        updated: new Date()
      }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('fields_types', null, {});
  }
};
