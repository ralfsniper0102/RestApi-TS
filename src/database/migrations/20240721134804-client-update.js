"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("client", "mobilePhone", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("client", "phone", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("client", "mobilePhone");
    await queryInterface.changeColumn("client", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
