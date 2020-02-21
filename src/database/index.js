const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

const { usersModel } = require('../models');

usersModel.init(connection);

// usersModel.associations(connection);

module.exports = connection;
