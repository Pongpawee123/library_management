const pool = require('../config/db.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/admin/dashboard
    async getDashboard(req, res) {
        try {
            const [books, members, borrows, overdues] = await Promise.all([
                pool.query('SELECT SUM(total_copies) as total FROM books'),
                pool.query("SELECT COUNT(*) as total FROM members WHERE status = 'active'"),
                pool.query("SELECT COUNT(*) as total FROM borrow_records WHERE status = 'borrowed'"),
                pool.query("SELECT COUNT(*) as total FROM borrow_records WHERE status = 'overdue'")
            ]);

            const dashboardData = {
                total_books: parseInt(books.rows[0].total) || 0,
                active_members: parseInt(members.rows[0].total) || 0,
                active_borrows: parseInt(borrows.rows[0].total) || 0,
                overdue_returns: parseInt(overdues.rows[0].total) || 0
            };

            return response.success(res, dashboardData);
        } catch (err) {
            console.error('getDashboard ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/admin/borrowings
    async getAllBorrowings(req, res) {
        try {
            const result = await pool.query(`
                SELECT br.id, m.full_name as member_name, b.title as book_title, 
                       br.borrowed_at, br.due_date, br.returned_at, br.status
                FROM borrow_records br
                JOIN members m ON br.member_id = m.id
                JOIN books b ON br.book_id = b.id
                ORDER BY br.borrowed_at DESC
            `);
            return response.success(res, result.rows);
        } catch (err) {
            console.error('getAllBorrowings ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // PATCH /api/admin/borrow/:id/approve
    async approveBorrow(req, res) {
        try {
            const borrowId = req.params.id;
            const result = await pool.query(`
                UPDATE borrow_records 
                SET status = 'borrowed', borrowed_at = NOW() 
                WHERE id = $1 RETURNING *
            `, [borrowId]);

            if (result.rows.length === 0) {
                return response.notFound(res, 'Borrow record not found');
            }
            return response.success(res, result.rows[0]);
        } catch (err) {
            console.error('approveBorrow ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // PATCH /api/admin/borrow/:id/return
    async returnBorrow(req, res) {
        try {
            const borrowId = req.params.id;
            
            const result = await pool.query(`
                UPDATE borrow_records 
                SET status = 'returned', returned_at = NOW() 
                WHERE id = $1 RETURNING *
            `, [borrowId]);

            if (result.rows.length === 0) {
                return response.notFound(res, 'Borrow record not found');
            }

            // Return copy to inventory using the exact nested subquery
            await pool.query(`
                UPDATE books 
                SET available_copies = available_copies + 1 
                WHERE id = (SELECT book_id FROM borrow_records WHERE id = $1)
            `, [borrowId]);

            return response.success(res, result.rows[0]);
        } catch (err) {
            console.error('returnBorrow ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/admin/members
    async getAllMembers(req, res) {
        try {
            const result = await pool.query(`
                SELECT 
                    u.id as user_id, 
                    COALESCE(m.full_name, 'Administrator') as name, 
                    u.email, 
                    u.role, 
                    COALESCE(m.status, 'Active') as status,
                    u.created_at as joined_date
                FROM users u
                LEFT JOIN members m ON u.id = m.user_id
                ORDER BY u.created_at DESC
            `);
            return response.success(res, result.rows);
        } catch (err) {
            console.error('getAllMembers ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // PATCH /api/admin/members/:id/toggle
    async toggleMemberStatus(req, res) {
        try {
            const userId = req.params.id;
            const memberRec = await pool.query('SELECT status FROM members WHERE user_id = $1', [userId]);
            if (memberRec.rows.length === 0) {
                // If they are admin or don't have member profile, ignore smoothly
                return response.success(res, { message: 'Ignored for non-member profiles' });
            }
            const newStatus = memberRec.rows[0].status === 'Active' ? 'Inactive' : 'Active';
            await pool.query('UPDATE members SET status = $1 WHERE user_id = $2', [newStatus, userId]);
            return response.success(res, { status: newStatus });
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // DELETE /api/admin/members/:id
    async deleteMember(req, res) {
        try {
            const userId = req.params.id;
            // Rely on CASCADE or delete individually
            await pool.query('DELETE FROM members WHERE user_id = $1', [userId]);
            await pool.query('DELETE FROM users WHERE id = $1', [userId]);
            return response.success(res, null);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // POST /api/admin/members — สร้างสมาชิกใหม่โดย Admin
    async createMember(req, res) {
        try {
            const AuthService = require('../services/authService.js');
            const { name, email, password, phone } = req.body;

            if (!name || !email || !password) {
                return response.badRequest(res, 'กรุณากรอก ชื่อ, อีเมล และ รหัสผ่าน');
            }

            // Reuse register logic to create users + members atomically
            const newUser = await AuthService.register({ name, email, password });

            // If phone provided, update the member record
            if (phone) {
                await pool.query('UPDATE members SET phone = $1 WHERE user_id = $2', [phone, newUser.id]);
            }

            return response.created(res, { id: newUser.id, email: newUser.email, name, role: 'member' });
        } catch (err) {
            console.error('createMember ERROR:', err);
            if (err.code === '23505' || err.message.includes('ถูกใช้งานแล้ว')) {
                return response.badRequest(res, 'อีเมลนี้ถูกใช้งานแล้ว');
            }
            return response.error(res, err.message, 400);
        }
    }
};
