const { users, categories, products } = require('./controllers');

module.exports = [
  new users().routes(),
  new categories().routes(),
  new products().routes(),
];
