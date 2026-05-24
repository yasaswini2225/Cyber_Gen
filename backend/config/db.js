// Import the mysql2 promise-based library
const mysql = require('mysql2/promise');
// Load environment variables from the .env file
require('dotenv').config();

// Create a connection pool to manage database connections efficiently
const dbPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cyber_courses_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection immediately on startup to provide helpful feedback to beginners
(async () => {
    try {
        const connection = await dbPool.getConnection();
        console.log('✔ Connected to MySQL Database successfully!');
        connection.release(); // release it back to the pool
    } catch (err) {
        console.error('❌ Database connection failed!');
        console.error(`Error details: ${err.message}`);
        console.error('👉 Please make sure MySQL is running (e.g. via XAMPP or MySQL Workbench) and your credentials in backend/.env are correct.');
    }
})();

// Export the pool to use it in server.js
module.exports = dbPool;
