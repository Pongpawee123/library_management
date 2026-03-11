const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "myfull",
  password: "mypassword",
  database: "myfullstack",
  port: 5432,
});

module.exports = pool;