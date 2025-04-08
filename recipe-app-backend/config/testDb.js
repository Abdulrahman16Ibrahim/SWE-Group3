// testDb.js
const pool = require('./db'); // Adjust the path if necessary

// Test query: simple arithmetic to check the connection
pool.query('SELECT 1 + 1 AS solution')
  .then(([rows]) => {
    console.log('Database connection successful:', rows);
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  })
  .finally(() => {
    pool.end();
  });
