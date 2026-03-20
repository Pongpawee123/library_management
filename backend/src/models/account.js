const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

module.exports = {

        async register({ email, password, role, full_name, phone }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const password_hash = await bcrypt.hash(password, 10);

            const userResult = await client.query(`
                INSERT INTO users (email, password_hash, role)
                VALUES ($1, $2, $3) RETURNING id, email, role`,
                [email, password_hash, role]
            );
            const user = userResult.rows[0];

            if (role === 'member') {
                await client.query(
                    'INSERT INTO members (full_name, phone, user_id) VALUES ($1, $2, $3)',
                    [full_name, phone, user.id]
                );
            }
            await client.query('COMMIT');
            return user;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
};