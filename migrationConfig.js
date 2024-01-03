const dotenv = require('dotenv');
const path = require('path');

(function () {
  dotenv.config({ path: path.join(__dirname, './.env') });
})();

module.exports = {
  development: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_DIALECT,
    logging: process.env.DATABASE_LOGGING,
  },
  production: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_DIALECT,
    logging: process.env.DATABASE_LOGGING,
  },
};
