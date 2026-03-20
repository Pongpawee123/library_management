const pool = require('../config/db.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/reports/summary — ภาพรวมทั้งหมด
    async getSummary(req, res) {
        try {
            const books      = await pool.query('SELECT COUNT(*) FROM books');
            const members    = await pool.query('SELECT COUNT(*) FROM members');
            const borrows    = await pool.query('SELECT COUNT(*) FROM borrow_records');
            const reservations = await pool.query('SELECT COUNT(*) FROM reservations');
            const activeBorrows = await pool.query(
                `SELECT COUNT(*) FROM borrow_records WHERE status = 'borrowed'`
            );
            const overdue = await pool.query(
                `SELECT COUNT(*) FROM borrow_records 
                 WHERE status = 'borrowed' AND due_date < NOW()`
            );
            const pendingReservations = await pool.query(
                `SELECT COUNT(*) FROM reservations WHERE status = 'pending'`
            );

            return response.success(res, {
                total_books:          parseInt(books.rows[0].count),
                total_members:        parseInt(members.rows[0].count),
                total_borrows:        parseInt(borrows.rows[0].count),
                total_reservations:   parseInt(reservations.rows[0].count),
                active_borrows:       parseInt(activeBorrows.rows[0].count),
                overdue_borrows:      parseInt(overdue.rows[0].count),
                pending_reservations: parseInt(pendingReservations.rows[0].count)
            });
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/reports/overdue — รายการเกินกำหนด
    async getOverdue(req, res) {
        try {
            const result = await pool.query(`
                SELECT
                    br.id,
                    m.full_name                        AS member_name,
                    b.title                            AS book_title,
                    br.borrowed_at,
                    br.due_date,
                    CURRENT_DATE - br.due_date::date   AS overdue_days,
                    (CURRENT_DATE - br.due_date::date) * 5 AS estimated_fine
                FROM borrow_records br
                JOIN members m ON br.member_id = m.id
                JOIN books   b ON br.book_id   = b.id
                WHERE br.status = 'borrowed' AND br.due_date < NOW()
                ORDER BY br.due_date ASC
            `);
            return response.success(res, result.rows);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/reports/popular-books — หนังสือยอดนิยม
    async getPopularBooks(req, res) {
        try {
            const result = await pool.query(`
                SELECT
                    b.id, b.title,
                    b.available_copies,
                    b.total_copies,
                    COUNT(br.id) AS borrow_count
                FROM books b
                LEFT JOIN borrow_records br ON b.id = br.book_id
                GROUP BY b.id
                ORDER BY borrow_count DESC
                LIMIT 10
            `);
            return response.success(res, result.rows);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/reports/borrow-history — ประวัติการยืม
    async getBorrowHistory(req, res) {
        try {
            const result = await pool.query(`
                SELECT
                    br.id,
                    m.full_name  AS member_name,
                    b.title      AS book_title,
                    br.borrowed_at,
                    br.due_date,
                    br.returned_at,
                    br.fine_amount,
                    br.status
                FROM borrow_records br
                JOIN members m ON br.member_id = m.id
                JOIN books   b ON br.book_id   = b.id
                ORDER BY br.borrowed_at DESC
            `);
            return response.success(res, result.rows);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/reports/fines — รายงานค่าปรับ
    async getFines(req, res) {
        try {
            const result = await pool.query(`
                SELECT
                    br.id,
                    m.full_name  AS member_name,
                    b.title      AS book_title,
                    br.due_date,
                    br.returned_at,
                    br.fine_amount,
                    br.status
                FROM borrow_records br
                JOIN members m ON br.member_id = m.id
                JOIN books   b ON br.book_id   = b.id
                WHERE br.fine_amount > 0
                ORDER BY br.fine_amount DESC
            `);
            const total = result.rows.reduce((sum, row) => {
                return sum + parseFloat(row.fine_amount);
            }, 0);
            return response.success(res, { items: result.rows, total_fines: total });
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/reports/member-activity — กิจกรรมสมาชิก
    async getMemberActivity(req, res) {
        try {
            const result = await pool.query(`
                SELECT
                    m.id,
                    m.full_name,
                    m.status,
                    COUNT(DISTINCT br.id) AS total_borrows,
                    COUNT(DISTINCT r.id)  AS total_reservations,
                    SUM(br.fine_amount)   AS total_fines
                FROM members m
                LEFT JOIN borrow_records br ON m.id = br.member_id
                LEFT JOIN reservations   r  ON m.id = r.member_id
                GROUP BY m.id
                ORDER BY total_borrows DESC
            `);
            return response.success(res, result.rows);
        } catch (err) {
            return response.error(res, err.message);
        }
    }
};