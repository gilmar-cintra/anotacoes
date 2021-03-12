const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Gilmar Cintra",
          email: "gilmarcintra@gmail.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10)),
          active: true,
          created: new Date(),
          updated: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete("users", null, {});
  },
};