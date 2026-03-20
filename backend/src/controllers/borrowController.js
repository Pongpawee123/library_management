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
            const { member_id, book_id } = req.body;
            if (!member_id || !book_id) {
                return response.badRequest(res, 'กรุณาระบุ member_id และ book_id');
            }
            const borrow = await BorrowService.borrowBook(member_id, book_id);
            return response.created(res, borrow);
        } catch (err) {
            console.error('borrowBook ERROR:', err);
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