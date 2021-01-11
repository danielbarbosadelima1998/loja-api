"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("order_items", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: "products",
          key: "id",
        },
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "orders",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unitPrice: {
        type: Sequelize.DECIMAL(20, 2),
      },
      discount: {
        type: Sequelize.DECIMAL(20, 2),
      },
      subtotal: {
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
    return queryInterface.dropTable("order_items");
  },
};
