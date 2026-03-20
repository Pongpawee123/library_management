// src/controllers/authorController.js
const Author = require('../models/author.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/authors — ดูผู้แต่งทั้งหมด
    async getAllAuthors(req, res) {
        try {
            const authors = await Author.getAll();
            return response.success(res, authors);
        } catch (err) {
            console.error('getAllAuthors ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/authors/:id — ดูผู้แต่งคนเดียว
    async getAuthorById(req, res) {
        try {
            const author = await Author.getById(req.params.id);
            if (!author) return response.notFound(res, 'ไม่พบผู้แต่ง');
            return response.success(res, author);
        } catch (err) {
            console.error('getAuthorById ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // POST /api/authors — เพิ่มผู้แต่งใหม่
    async createAuthor(req, res) {
        try {
            const { name, bio } = req.body;
            if (!name) return response.badRequest(res, 'กรุณากรอกชื่อผู้แต่ง');
            const author = await Author.create({ name, bio });
            return response.created(res, author);
        } catch (err) {
            console.error('createAuthor ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // PUT /api/authors/:id — แก้ไขผู้แต่ง
    async updateAuthor(req, res) {
        try {
            const { name, bio } = req.body;
            const author = await Author.update(req.params.id, { name, bio });
            if (!author) return response.notFound(res, 'ไม่พบผู้แต่ง');
            return response.success(res, author);
        } catch (err) {
            console.error('updateAuthor ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // DELETE /api/authors/:id — ลบผู้แต่ง
    async deleteAuthor(req, res) {
        try {
            const author = await Author.remove(req.params.id);
            if (!author) return response.notFound(res, 'ไม่พบผู้แต่ง');
            return response.success(res, { message: 'ลบผู้แต่งสำเร็จ' });
        } catch (err) {
            console.error('deleteAuthor ERROR:', err);
            return response.error(res, err.message);
        }
    }
};