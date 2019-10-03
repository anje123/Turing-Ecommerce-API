'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shopping_carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.INTEGER
      },
      cart_id: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      attributes: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      buy_now: {
        type: Sequelize.STRING
      },
      added_on: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shopping_carts');
  }
};