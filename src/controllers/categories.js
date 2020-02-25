const baseController = require('./baseController');

const { categoriesModel } = require('../models');

class Categories extends baseController {
  constructor() {
    super('/categories', categoriesModel);
  }

  routes() {
    const route = super.routes();
    // internal routes
    return route;
  }
}

module.exports = Categories;
