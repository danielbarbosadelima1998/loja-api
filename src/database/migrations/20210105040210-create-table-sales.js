"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sales", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "orders",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      paymentType: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.DECIMAL(20, 2),
      },
      total: {
        type: Sequelize.DECIMAL(20, 2),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sales");
  },
};
