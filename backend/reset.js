const bcrypt = require('bcrypt');
const pool = require('./src/config/db.js');

async function resetPasswords() {
    try {
        const hash = await bcrypt.hash('123456', 10);
        await pool.query('UPDATE users SET password_hash = $1', [hash]);
        console.log('Successfully reset all user passwords to 123456');
        process.exit(0);
    } catch (e) {
        console.error('Failed to reset:', e);
        process.exit(1);
    }
}

resetPasswords();
