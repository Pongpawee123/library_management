const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

module.exports = {

    async getAll() {
        const result = await pool.query('SELECT id, email, role FROM users');
        // ไม่ดึง password_hash กลับมา
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query(
            'SELECT id, email, role FROM users WHERE id = $1', [id]
        );
        return result.rows[0];
    },

    // เปลี่ยนจาก username → email, md5 → bcrypt
    async login(email, password) {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        if (result.rows.length === 0) return null;

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        // bcrypt เทียบ password กับ hash ใน DB

        return isMatch ? user : null;
        // ถ้าตรง return user, ถ้าไม่ตรง return null
    }
};