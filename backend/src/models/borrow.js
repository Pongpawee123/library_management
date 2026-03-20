const pool = require('../config/db.js');

module.exports = {

    // ดึงรายการยืมทั้งหมด
    async getAll() {
        const result = await pool.query(`
            SELECT 
                br.id,
                m.full_name     AS member_name,
                b.title         AS book_title,
                br.borrowed_at,
                br.due_date,
                br.returned_at,
                br.fine_amount,
                br.status,
                br.extended
            FROM borrow_records br
            JOIN members m ON br.member_id = m.id
            JOIN books   b ON br.book_id   = b.id
            ORDER BY br.id DESC
        `);
        return result.rows;
    },

    // ดึงรายการยืมจาก id
    async getById(id) {
        const result = await pool.query(`
            SELECT 
                br.id,
                br.member_id,
                br.book_id,
                m.full_name     AS member_name,
                b.title         AS book_title,
                b.available_copies,
                br.borrowed_at,
                br.due_date,
                br.returned_at,
                br.fine_amount,
                br.status,
                br.extended
            FROM borrow_records br
            JOIN members m ON br.member_id = m.id
            JOIN books   b ON br.book_id   = b.id
            WHERE br.id = $1
        `, [id]);
        return result.rows[0];
    },

    // ดึงรายการยืมของ member คนนึง
    async getByMemberId(member_id) {
        const result = await pool.query(`
            SELECT 
                br.id,
                b.title         AS book_title,
                br.borrowed_at,
                br.due_date,
                br.returned_at,
                br.fine_amount,
                br.status
            FROM borrow_records br
            JOIN books b ON br.book_id = b.id
            WHERE br.member_id = $1
            ORDER BY br.id DESC
        `, [member_id]);
        return result.rows;
    },

    // เช็คสมาชิก
    async getMemberStatus(member_id) {
        const result = await pool.query(
            'SELECT id, status FROM members WHERE id = $1', [member_id]
        );
        return result.rows[0];
    },

    // เช็คหนังสือ
    async getBookAvailability(book_id) {
        const result = await pool.query(
            'SELECT id, available_copies FROM books WHERE id = $1', [book_id]
        );
        return result.rows[0];
    },

    // ยืมหนังสือ
    async borrow(member_id, book_id) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // กำหนด due_date 14 วัน
            const due_date = new Date();
            due_date.setDate(due_date.getDate() + 14);

            // บันทึกการยืม
            const result = await client.query(`
                INSERT INTO borrow_records (member_id, book_id, due_date)
                VALUES ($1, $2, $3) RETURNING *
            `, [member_id, book_id, due_date]);

            // ลด available_copies
            await client.query(
                'UPDATE books SET available_copies = available_copies - 1 WHERE id = $1',
                [book_id]
            );

            await client.query('COMMIT');
            return result.rows[0];

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    // คืนหนังสือ
    async returnBook(id, fine_amount) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // อัพเดทสถานะ
            const result = await client.query(`
                UPDATE borrow_records
                SET status = 'returned', 
                    returned_at = NOW(), 
                    fine_amount = $1
                WHERE id = $2 RETURNING *
            `, [fine_amount, id]);

            // เพิ่ม available_copies กลับ
            await client.query(`
                UPDATE books 
                SET available_copies = available_copies + 1 
                WHERE id = (SELECT book_id FROM borrow_records WHERE id = $1)
            `, [id]);

            await client.query('COMMIT');
            return result.rows[0];

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    // ต่ออายุการยืม
    async extendBorrow(id) {
        const result = await pool.query(`
            UPDATE borrow_records
            SET due_date = due_date + INTERVAL '7 days',
                extended = true
            WHERE id = $1 RETURNING *
        `, [id]);
        return result.rows[0];
    }
};