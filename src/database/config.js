const dotenv = require("dotenv").config();

const config = {
  db: {
    connectionLimit: 100,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectTimeout: 15000,
  },
  listPerPage: 10,
};
module.exports = config;
