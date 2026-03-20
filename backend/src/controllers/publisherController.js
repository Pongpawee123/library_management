// src/controllers/publisherController.js
const Publisher = require('../models/publisher.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/publishers — ดูสำนักพิมพ์ทั้งหมด
    async getAllPublishers(req, res) {
        try {
            const publishers = await Publisher.getAll();
            return response.success(res, publishers);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/publishers/:id — ดูสำนักพิมพ์เดียว
    async getPublisherById(req, res) {
        try {
            const publisher = await Publisher.getById(req.params.id);
            if (!publisher) return response.notFound(res, 'ไม่พบสำนักพิมพ์');
            return response.success(res, publisher);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // POST /api/publishers — เพิ่มสำนักพิมพ์ใหม่
    async createPublisher(req, res) {
        try {
            const { name, contact_email } = req.body;
            if (!name) return response.badRequest(res, 'กรุณากรอกชื่อสำนักพิมพ์');
            const publisher = await Publisher.create({ name, contact_email });
            return response.created(res, publisher);
        } catch (err) {
            if (err.code === '23505') {
                return response.badRequest(res, 'ชื่อสำนักพิมพ์นี้มีอยู่แล้ว');
            }
            return response.error(res, err.message);
        }
    },

    // PUT /api/publishers/:id — แก้ไขสำนักพิมพ์
    async updatePublisher(req, res) {
        try {
            const { name, contact_email } = req.body;
            if (!name) return response.badRequest(res, 'กรุณากรอกชื่อสำนักพิมพ์');
            const publisher = await Publisher.update(req.params.id, { name, contact_email });
            if (!publisher) return response.notFound(res, 'ไม่พบสำนักพิมพ์');
            return response.success(res, publisher);
        } catch (err) {
            if (err.code === '23505') {
                return response.badRequest(res, 'ชื่อสำนักพิมพ์นี้มีอยู่แล้ว');
            }
            return response.error(res, err.message);
        }
    },

    // DELETE /api/publishers/:id — ลบสำนักพิมพ์
    async deletePublisher(req, res) {
        try {
            const publisher = await Publisher.remove(req.params.id);
            if (!publisher) return response.notFound(res, 'ไม่พบสำนักพิมพ์');
            return response.success(res, { message: 'ลบสำนักพิมพ์สำเร็จ' });
        } catch (err) {
            return response.error(res, err.message);
        }
    }
};