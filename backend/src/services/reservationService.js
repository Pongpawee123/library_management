// src/services/reservationService.js
const Reservation = require('../models/reservation.js');

module.exports = {

    // ดึงการจองทั้งหมด
    async getAllReservations() {
        return await Reservation.getAll();
    },

    // ดึงการจองจาก id
    async getReservationById(id) {
        const reservation = await Reservation.getById(id);
        if (!reservation) throw new Error('ไม่พบการจอง');
        return reservation;
    },

    // ดึงการจองของ member
    async getReservationsByMember(member_id) {
        return await Reservation.getByMemberId(member_id);
    },

    // สร้างการจอง
    async createReservation(member_id, book_id) {

        // เช็คสมาชิก
        const member = await Reservation.getMemberStatus(member_id);
        if (!member) throw new Error('ไม่พบสมาชิก');
        if (member.status === 'suspended') {
            throw new Error('สมาชิกถูกระงับ ไม่สามารถจองได้');
        }

        // เช็คหนังสือ
        const book = await Reservation.getBook(book_id);
        if (!book) throw new Error('ไม่พบหนังสือ');

        // ถ้าหนังสือยังมีเหลือ ไม่ต้องจอง
        if (book.available_copies > 0) {
            throw new Error('หนังสือยังมีเหลือ ไม่จำเป็นต้องจอง');
        }

        // เช็คจองซ้ำ
        const duplicate = await Reservation.checkDuplicate(member_id, book_id);
        if (duplicate) {
            throw new Error('คุณจองหนังสือเล่มนี้แล้ว');
        }
        return await Reservation.create(member_id, book_id);
    },

    // ยกเลิกการจอง
    async cancelReservation(id) {
        const reservation = await Reservation.getById(id);
        if (!reservation) throw new Error('ไม่พบการจอง');

        if (reservation.status === 'cancelled') {
            throw new Error('ยกเลิกการจองแล้ว');
        }
        if (reservation.status === 'fulfilled') {
            throw new Error('การจองถูกอนุมัติแล้ว ไม่สามารถยกเลิกได้');
        }
        return await Reservation.cancel(id);
    },

    // อนุมัติการจอง
    async fulfillReservation(id) {
        const reservation = await Reservation.getById(id);
        if (!reservation) throw new Error('ไม่พบการจอง');

        if (reservation.status !== 'pending') {
            throw new Error('การจองนี้ไม่ได้อยู่ในสถานะรอดำเนินการ');
        }
        return await Reservation.fulfill(id);
    }
};