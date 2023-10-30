const mysql = require("mysql2");
require("dotenv").config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    queueLimit: process.env.DB_QUEUE_LIMIT,
    multipleStatements: process.env.DB_MULTIPLE_STATEMENTS,
  })
  .promise(); // Using promises for async/await

module.exports = db;
