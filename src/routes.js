const Users = require('./controllers/users');

module.exports = [
  new Users().routes(),
];
