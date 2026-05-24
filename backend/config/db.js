const { Pool } = require('pg');
require('dotenv').config();

const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
    try {
        const client = await dbPool.connect();
        console.log('✔ Connected to Supabase database!');
        client.release();
    } catch (err) {
        console.error('❌ Database connection failed!');
        console.error(err.message);
    }
})();

module.exports = dbPool;