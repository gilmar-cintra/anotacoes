'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('phones_types',
    [{
      type: 'Comercial',
      created: new Date(),
      updated: new Date()
    },
    {
      type: 'Pessoal',
      created: new Date(),
      updated: new Date()
    },
    {
      type: 'Educacional',
      created: new Date(),
      updated: new Date()
    },
    {
      type: 'Especial',
      created: new Date(),
      updated: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('phones_types', null, {});
  }
};
