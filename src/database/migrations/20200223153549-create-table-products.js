'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        code: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        costPrice: {
          type: Sequelize.DECIMAL(20, 2),
          allowNull: true,
        },
        salePrice: {
          type: Sequelize.DECIMAL(20, 2),
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'categories',
            key: 'id'
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,

        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
