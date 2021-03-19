'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('emails',
    [{
      email: 'teste1@gmail.com',
      emailTypeId: 3,
      userId: 2,
      created: new Date(),
      updated: new Date()
    },
    {
      email: 'tessdste1@gmail.com',
      emailTypeId: 2,
      userId: 2,
      created: new Date(),
      updated: new Date()
    },
    {
      email: 'blabla@gmail.com',
      emailTypeId: 1,
      userId: 2,
      created: new Date(),
      updated: new Date()
    },
    {
      email: 'sdblabla@gmail.com',
      emailTypeId: 1,
      userId: 3,
      created: new Date(),
      updated: new Date()
    },
    {
      email: 'sdsemcond@gmail.com',
      emailTypeId: 1,
      userId: 3,
      created: new Date(),
      updated: new Date()
    },
    {
      email: 'eitasdblabla@gmail.com',
      emailTypeId: 2,
      userId: 3,
      created: new Date(),
      updated: new Date()
    },
    {
      email: 'adrasasajjj@gmail.com',
      emailTypeId: 2,
      userId: 4,
      created: new Date(),
      updated: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('emails', null, {});
  }
};
