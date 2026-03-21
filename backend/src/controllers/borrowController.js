// src/controllers/borrowController.js
const BorrowService = require('../services/borrowService.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/borrows — ดูรายการยืมทั้งหมด
    async getAllBorrows(req, res) {
        try {
            const borrows = await BorrowService.getAllBorrows();
            return response.success(res, borrows);
        } catch (err) {
            console.error('getAllBorrows ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/borrows/:id — ดูรายการยืมเดียว
    async getBorrowById(req, res) {
        try {
            const borrow = await BorrowService.getBorrowById(req.params.id);
            return response.success(res, borrow);
        } catch (err) {
            console.error('getBorrowById ERROR:', err);
            const status = err.message === 'ไม่พบรายการยืม' ? 404 : 500;
            return response.error(res, err.message, status);
        }
    },

    // GET /api/borrows/my — ดูรายการยืมของฉัน (ใช้อ้างอิงจาก Token)
    async getMyBorrows(req, res) {
        try {
            const user_id = req.user.sub || req.user.id; // from authenticateToken middleware
            const pool = require('../config/db.js');
            const memberRes = await pool.query('SELECT id FROM members WHERE user_id = $1', [user_id]);
            if (memberRes.rows.length === 0) {
                // Not a member, therefore no borrows mapped safely
                return response.success(res, []);
            }
            
            const member_id = memberRes.rows[0].id;
            const borrows = await BorrowService.getBorrowsByMember(member_id);
            return response.success(res, borrows);
        } catch (err) {
            console.error('getMyBorrows ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/borrows/member/:member_id — ดูรายการยืมของสมาชิก
    async getBorrowsByMember(req, res) {
        try {
            const borrows = await BorrowService.getBorrowsByMember(req.params.member_id);
            return response.success(res, borrows);
        } catch (err) {
            console.error('getBorrowsByMember ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // POST /api/borrows — ยืมหนังสือ
    async borrowBook(req, res) {
        try {
            const pool = require('../config/db.js');
            // If frontend passes frontend user_id as member_id, intercept it and find the real members.id!
            // Usually req.body.member_id from frontend will be the users.id because of localStorage
            // Let's resolve the actual member table ID using req.user.id which is safe from our auth token
            const user_id = req.user?.sub || req.user?.id;
            
            if (!user_id) return response.error(res, 'Unauthorized', 401);

            const memberRes = await pool.query('SELECT id FROM members WHERE user_id = $1', [user_id]);
            if (memberRes.rows.length === 0) {
                return response.badRequest(res, 'Profile is not fully registered as a member yet.');
            }
            
            const member_id = memberRes.rows[0].id;
            const { book_id } = req.body;
            if (!member_id || !book_id) {
                return response.badRequest(res, 'กรุณาระบุ member_id และ book_id');
            }
            const borrow = await BorrowService.borrowBook(member_id, book_id);
            return response.created(res, borrow);
        } catch (err) {
            console.error('borrowBook ERROR:', err);
            
            // Catch PostgreSQL unique constraint violation
            if (err.code === '23505' || (err.message && err.message.includes('unique_active_borrow'))) {
                return response.badRequest(res, 'You already borrowed this book');
            }
            
            // Output explicit english checks if requested
            if (err.message === 'You already borrowed this book') return response.badRequest(res, err.message);
            if (err.message === 'Book not available') return response.badRequest(res, err.message);

            const status = err.message.includes('ไม่พบ') ? 404 : 400;
            return response.error(res, err.message, status);
        }
    },

    // PUT /api/borrows/:id/return — คืนหนังสือ
    async returnBook(req, res) {
        try {
            const borrow = await BorrowService.returnBook(req.params.id);
            return response.success(res, borrow);
        } catch (err) {
            console.error('returnBook ERROR:', err);
            const status = err.message === 'ไม่พบรายการยืม' ? 404 : 400;
            return response.error(res, err.message, status);
        }
    },

    // PUT /api/borrows/:id/extend — ต่ออายุการยืม
    async extendBorrow(req, res) {
        try {
            const borrow = await BorrowService.extendBorrow(req.params.id);
            return response.success(res, borrow);
        } catch (err) {
            console.error('extendBorrow ERROR:', err);
            const status = err.message === 'ไม่พบรายการยืม' ? 404 : 400;
            return response.error(res, err.message, status);
        }
    }
};