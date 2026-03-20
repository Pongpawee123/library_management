const pool = require('../config/db.js');

module.exports = {

    // ดึงการจองทั้งหมด
    async getAll() {
        const result = await pool.query(`
            SELECT
                r.id,
                m.full_name  AS member_name,
                b.title      AS book_title,
                r.reserved_at,
                r.status
            FROM reservations r
            JOIN members m ON r.member_id = m.id
            JOIN books   b ON r.book_id   = b.id
            ORDER BY r.id DESC
        `);
        return result.rows;
    },

    // ดึงการจองจาก id
    async getById(id) {
        const result = await pool.query(`
            SELECT
                r.id,
                r.member_id,
                r.book_id,
                m.full_name  AS member_name,
                b.title      AS book_title,
                r.reserved_at,
                r.status
            FROM reservations r
            JOIN members m ON r.member_id = m.id
            JOIN books   b ON r.book_id   = b.id
            WHERE r.id = $1
        `, [id]);
        return result.rows[0];
    },

    // ดึงการจองของ member คนนึง
    async getByMemberId(member_id) {
        const result = await pool.query(`
            SELECT
                r.id,
                b.title      AS book_title,
                r.reserved_at,
                r.status
            FROM reservations r
            JOIN books b ON r.book_id = b.id
            WHERE r.member_id = $1
            ORDER BY r.id DESC
        `, [member_id]);
        return result.rows;
    },

    // เช็คการจองซ้ำ
    async checkDuplicate(member_id, book_id) {
        const result = await pool.query(`
            SELECT id FROM reservations
            WHERE member_id = $1 
            AND book_id = $2
            AND status = 'pending'
        `, [member_id, book_id]);
        return result.rows[0];
    },

    // เช็คสมาชิก
    async getMemberStatus(member_id) {
        const result = await pool.query(
            'SELECT id, status FROM members WHERE id = $1', [member_id]
        );
        return result.rows[0];
    },

    // เช็คหนังสือ
    async getBook(book_id) {
        const result = await pool.query(
            'SELECT id, title, available_copies FROM books WHERE id = $1', [book_id]
        );
        return result.rows[0];
    },

    // สร้างการจอง
    async create(member_id, book_id) {
        const result = await pool.query(`
            INSERT INTO reservations (member_id, book_id)
            VALUES ($1, $2) RETURNING *
        `, [member_id, book_id]);
        return result.rows[0];
    },

    // ยกเลิกการจอง
    async cancel(id) {
        const result = await pool.query(`
            UPDATE reservations
            SET status = 'cancelled'
            WHERE id = $1 RETURNING *
        `, [id]);
        return result.rows[0];
    },

    // อนุมัติการจอง
    async fulfill(id) {
        const result = await pool.query(`
            UPDATE reservations
            SET status = 'fulfilled'
            WHERE id = $1 RETURNING *
        `, [id]);
        return result.rows[0];
    }
};