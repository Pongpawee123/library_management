const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

module.exports = {

    // GET — ดึง user ทั้งหมด
    async getAll() {
        const result = await pool.query(
            `SELECT id, email, role, created_at 
             FROM users ORDER BY id ASC`
        );
        return result.rows;
    },

    // GET — ดึง user จาก id
    async getById(id) {
        const result = await pool.query(
            `SELECT id, email, role, created_at 
             FROM users WHERE id = $1`, [id]
        );
        return result.rows[0];
    },

    // POST — สร้าง user ใหม่
    async create({ email, password, role }) {
        const password_hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO users (email, password_hash, role)
             VALUES ($1, $2, $3) 
             RETURNING id, email, role, created_at`,
            [email, password_hash, role]
        );
        return result.rows[0];
    },

    // PUT — เปลี่ยน role
    async updateRole(id, role) {
        const result = await pool.query(
            `UPDATE users SET role = $1 
             WHERE id = $2 
             RETURNING id, email, role`,
            [role, id]
        );
        return result.rows[0];
    },

    // PUT — เปลี่ยน password
    async updatePassword(id, newPassword) {
        const password_hash = await bcrypt.hash(newPassword, 10);
        const result = await pool.query(
            `UPDATE users SET password_hash = $1 
             WHERE id = $2 
             RETURNING id, email`,
            [password_hash, id]
        );
        return result.rows[0];
    },

    // DELETE — ลบ user
    async remove(id) {
        const result = await pool.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
};