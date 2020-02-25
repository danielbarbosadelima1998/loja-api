const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

const { usersModel, categoriesModel, productsModel } = require('../models');

usersModel.init(connection);
categoriesModel.init(connection);
productsModel.init(connection);

// usersModel.associate(connection);
categoriesModel.associate(connection.models);
productsModel.associate(connection.models);
module.exports = connection;
