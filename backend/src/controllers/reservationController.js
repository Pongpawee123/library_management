// src/controllers/reservationController.js
const ReservationService = require('../services/reservationService.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/reservations — ดูการจองทั้งหมด
    async getAllReservations(req, res) {
        try {
            const reservations = await ReservationService.getAllReservations();
            return response.success(res, reservations);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/reservations/:id — ดูการจองเดียว
    async getReservationById(req, res) {
        try {
            const reservation = await ReservationService.getReservationById(req.params.id);
            return response.success(res, reservation);
        } catch (err) {
            const status = err.message === 'ไม่พบการจอง' ? 404 : 500;
            return response.error(res, err.message, status);
        }
    },

    // GET /api/reservations/member/:member_id — ดูการจองของสมาชิก
    async getReservationsByMember(req, res) {
        try {
            const reservations = await ReservationService.getReservationsByMember(
                req.params.member_id
            );
            return response.success(res, reservations);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // POST /api/reservations — จองหนังสือ
    async createReservation(req, res) {
        try {
            const { member_id, book_id } = req.body;
            if (!member_id || !book_id) {
                return response.badRequest(res, 'กรุณาระบุ member_id และ book_id');
            }
            const reservation = await ReservationService.createReservation(member_id, book_id);
            return response.created(res, reservation);
        } catch (err) {
            const status = err.message.includes('ไม่พบ') ? 404 : 400;
            return response.error(res, err.message, status);
        }
    },

    // PUT /api/reservations/:id/cancel — ยกเลิกการจอง
    async cancelReservation(req, res) {
        try {
            const reservation = await ReservationService.cancelReservation(req.params.id);
            return response.success(res, reservation);
        } catch (err) {
            const status = err.message === 'ไม่พบการจอง' ? 404 : 400;
            return response.error(res, err.message, status);
        }
    },

    // PUT /api/reservations/:id/fulfill — อนุมัติการจอง
    async fulfillReservation(req, res) {
        try {
            const reservation = await ReservationService.fulfillReservation(req.params.id);
            return response.success(res, reservation);
        } catch (err) {
            const status = err.message === 'ไม่พบการจอง' ? 404 : 400;
            return response.error(res, err.message, status);
        }
    }
};