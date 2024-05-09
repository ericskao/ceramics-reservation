const Pool = require("pg").Pool;
const pool = new Pool({
  user: "kao",
  host: "localhost",
  database: "kao",
  password: "password",
  port: 5432,
});

module.exports = pool;
