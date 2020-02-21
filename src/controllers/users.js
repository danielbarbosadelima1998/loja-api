const baseController = require('./baseController');

const { usersModel } = require('../models');

class Users extends baseController {
  constructor() {
    super('/users', usersModel);
  }

  routes() {
    const route = super.routes();
    // rotas internas

    return route;
  }
}

module.exports = Users;
