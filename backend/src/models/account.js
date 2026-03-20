const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

module.exports = {

    // GET — ดึง user ทั้งหมด
    async getAll() {
        const result = await pool.query(
            'SELECT id, email, role, created_at FROM users ORDER BY id ASC'
        );
        return result.rows;
    },

    // GET — ดึง user จาก id
    async getById(id) {
        const result = await pool.query(
            'SELECT id, email, role, created_at FROM users WHERE id = $1', [id]
        );
        return result.rows[0];
    },

    // POST — login
    async login(email, password) {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        if (result.rows.length === 0) return null;

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        return isMatch ? user : null;
    },

    // POST — register
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