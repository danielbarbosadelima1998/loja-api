const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (params) =>
    jwt.sign(
      {
        params,
      },
      process.env.SECRET,
      {
        expiresIn: 86400,
      }
    ),
};
