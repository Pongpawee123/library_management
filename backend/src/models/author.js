const pool = require('../config/db.js');

module.exports = {

    // ดึง author ทั้งหมด
    async getAll() {
        const result = await pool.query(
            'SELECT * FROM authors ORDER BY id ASC'
        );
        return result.rows;
    },
    // ดึง author จาก id
    async getById(id) {
        const result = await pool.query(
            'SELECT * FROM authors WHERE id = $1', [id]
        );
        return result.rows[0];
    },
    // เพิ่ม author ใหม่
    async create({ name, bio }) {
        const result = await pool.query(
            `INSERT INTO authors (name, bio)
             VALUES ($1, $2) RETURNING *`,
            [name, bio]
        );
        return result.rows[0];
    },
    // แก้ไข author
    async update(id, { name, bio }) {
        const result = await pool.query(
            `UPDATE authors SET name=$1, bio=$2
             WHERE id=$3 RETURNING *`,
            [name, bio, id]
        );
        return result.rows[0];
    },
    // ลบ author
    async remove(id) {
        const result = await pool.query(
            'DELETE FROM authors WHERE id=$1 RETURNING *', [id]
        );
        return result.rows[0];
    }
};