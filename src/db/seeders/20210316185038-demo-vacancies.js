'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vacancies',
      [{
        vacancy: 'Programador PHP',
        userId: "2",
        created: new Date(),
        updated: new Date()
      },
      {
        vacancy: 'Estagiário nodeJS',
        userId: "2",
        created: new Date(),
        updated: new Date()
      },
      {
        vacancy: 'Modelador de Banco de Dados',
        userId: "2",
        created: new Date(),
        updated: new Date()
      }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vacancies', null, {});
  }
};