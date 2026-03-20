// src/controllers/bookController.js
const BookService = require('../services/bookService.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/books — ดูหนังสือทั้งหมด
    async getAllBooks(req, res) {
        try {
            const books = await BookService.getAllBooks();
            return response.success(res, books);
        } catch (err) {
            console.error('getAllBooks ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/books/:id — ดูหนังสือเล่มเดียว
    async getBookById(req, res) {
        try {
            const book = await BookService.getBookById(req.params.id);
            return response.success(res, book);
        } catch (err) {
            console.error('getBookById ERROR:', err);
            const status = err.message === 'ไม่พบหนังสือ' ? 404 : 500;
            return response.error(res, err.message, status);
        }
    },

    // POST /api/books — เพิ่มหนังสือใหม่
    async createBook(req, res) {
        try {
            const book = await BookService.createBook(req.body);
            return response.created(res, book);
        } catch (err) {
            console.error('createBook ERROR:', err);
            const status = err.message.includes('กรุณา') ? 400 : 500;
            return response.error(res, err.message, status);
        }
    },

    // PUT /api/books/:id — แก้ไขหนังสือ
    async updateBook(req, res) {
        try {
            const book = await BookService.updateBook(req.params.id, req.body);
            return response.success(res, book);
        } catch (err) {
            console.error('updateBook ERROR:', err);
            const status = err.message === 'ไม่พบหนังสือ' ? 404 : 500;
            return response.error(res, err.message, status);
        }
    },

    // DELETE /api/books/:id — ลบหนังสือ
    async deleteBook(req, res) {
        try {
            const result = await BookService.deleteBook(req.params.id);
            return response.success(res, result);
        } catch (err) {
            console.error('deleteBook ERROR:', err);
            const status = err.message === 'ไม่พบหนังสือ' ? 404 : 500;
            return response.error(res, err.message, status);
        }
    }
};