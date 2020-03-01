const baseController = require('./baseController');

const { productsModel } = require('../models');

class Products extends baseController {
  constructor() {
    super('/products', productsModel);
  }

  
  routes() {
    const route = super.routes();
    // rotas internas

    return route;
  }
}

module.exports = Products;
