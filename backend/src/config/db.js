// src/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
    host:     'localhost',
    port:     5432,
    database: 'myfullstack',
    user:     'myfull',
    password: 'mypassword',
});

pool.connect((err) => {
    if (err) {
        console.error('❌ DB connection failed:', err.message);
    } else {
        console.log('✅ DB connected!');
    }
});

module.exports = pool;