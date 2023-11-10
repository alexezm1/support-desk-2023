const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.POSTGRESQL_URER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DB_NAME,
  password: process.env.POSTGRESQL_PASS,
  port: process.env.POSTGRESQL_PORT,
});

module.exports = pool;
