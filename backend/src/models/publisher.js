const pool = require('../config/db.js');

module.exports = {

    async getAll() {
        const result = await pool.query(
            'SELECT * FROM publishers ORDER BY id ASC'
        );
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query(
            'SELECT * FROM publishers WHERE id = $1', [id]
        );
        return result.rows[0];
    },

    async create({ name, contact_email }) {
        const result = await pool.query(
            `INSERT INTO publishers (name, contact_email)
             VALUES ($1, $2) RETURNING *`,
            [name, contact_email]
        );
        return result.rows[0];
    },

    async update(id, { name, contact_email }) {
        const result = await pool.query(
            `UPDATE publishers SET name=$1, contact_email=$2
             WHERE id=$3 RETURNING *`,
            [name, contact_email, id]
        );
        return result.rows[0];
    },

    async remove(id) {
        const result = await pool.query(
            'DELETE FROM publishers WHERE id=$1 RETURNING *', [id]
        );
        return result.rows[0];
    }
};