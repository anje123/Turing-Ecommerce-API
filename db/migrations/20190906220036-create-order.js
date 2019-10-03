'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.INTEGER
      },
      created_on: {
        type: Sequelize.DATE
      },
      shipped_on: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      auth_code: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      shipping_id: {
        type: Sequelize.INTEGER
      },
      tax_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Orders');
  }
};