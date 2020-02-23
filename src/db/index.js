const { Pool } = require('pg');

const pool = new Pool();

async function query(sql, values) {
  const { rows } = await pool.query(sql, values);
  return rows;
}

module.exports = {
  query
}
