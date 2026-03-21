// src/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
    host:     process.env.DB_HOST || '127.0.0.1',
    port:     process.env.DB_PORT || 5433,
    database: process.env.DB_NAME || 'myfullstack',
    user:     process.env.DB_USER || 'myfull',
    password: process.env.DB_PASSWORD || 'mypassword',
});

pool.connect((err) => {
    if (err) {
        console.error('❌ DB connection failed:', err.message);
    } else {
        console.log('✅ DB connected!');
    }
});

module.exports = pool;