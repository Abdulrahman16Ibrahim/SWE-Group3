const mysql = require('mysql2/promise');

// NOTE: Replace placeholders with your actual MySQL credentials
const pool = mysql.createPool({
    host: 'localhost',      // or your remote DB endpoint
    user: 'root',           // or another MySQL user
    password: '',
    database: 'meal_planner_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
