require('dotenv').config();

const {
  DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_DIALECT, DB_HOST, DB_PORT,
} = process.env;

module.exports = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
};
