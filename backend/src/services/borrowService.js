const Borrow = require('../models/borrow.js');
const FineService = require('./fineService.js');

module.exports = {

    // ดึงรายการยืมทั้งหมด
    async getAllBorrows() {
        return await Borrow.getAll();
    },

    // ดึงรายการยืมจาก id
    async getBorrowById(id) {
        const borrow = await Borrow.getById(id);
        if (!borrow) throw new Error('ไม่พบรายการยืม');
        return borrow;
    },

    // ดึงรายการยืมของ member
    async getBorrowsByMember(member_id) {
        return await Borrow.getByMemberId(member_id);
    },

    // ยืมหนังสือ
    async borrowBook(member_id, book_id) {

        // เช็คสมาชิก
        const member = await Borrow.getMemberStatus(member_id);
        if (!member) throw new Error('ไม่พบสมาชิก');
        if (member.status === 'suspended') {
            throw new Error('สมาชิกถูกระงับ ไม่สามารถยืมได้');
        }

        // เช็คหนังสือ
        const book = await Borrow.getBookAvailability(book_id);
        if (!book) throw new Error('ไม่พบหนังสือ');
        if (book.available_copies <= 0) {
            throw new Error('Book not available');
        }

        return await Borrow.borrow(member_id, book_id);
    },

    // คืนหนังสือ + คำนวณค่าปรับ
    async returnBook(id) {
        const borrow = await Borrow.getById(id);
        if (!borrow) throw new Error('ไม่พบรายการยืม');
        if (borrow.status === 'returned') throw new Error('คืนหนังสือแล้ว');

        // ใช้ fineService คำนวณค่าปรับ
        const fine_amount = FineService.calculateFine(borrow.due_date);

        return await Borrow.returnBook(id, fine_amount);
    },

    // ต่ออายุการยืม
    async extendBorrow(id) {
        const borrow = await Borrow.getById(id);
        if (!borrow) throw new Error('ไม่พบรายการยืม');
        if (borrow.status === 'returned') {
            throw new Error('คืนหนังสือแล้ว ไม่สามารถต่ออายุได้');
        }
        if (borrow.extended) {
            throw new Error('ต่ออายุแล้ว ไม่สามารถต่ออายุซ้ำได้');
        }
        return await Borrow.extendBorrow(id);
    }
};