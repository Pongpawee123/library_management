// src/controllers/bookController.js
const Book = require('../models/bookModel.js');

module.exports = {

    // GET /api/books
    async getAllBooks(req, res) {
        try {
            const books = await Book.getAll();
            res.json({ success: true, data: books });
        } catch (err) {
            console.error('getAllBooks ERROR:', err);
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // GET /api/books/:id
    async getBookById(req, res) {
        try {
            const book = await Book.getById(req.params.id);

            if (!book) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'ไม่พบหนังสือ' 
                });
            }

            res.json({ success: true, data: book });
        } catch (err) {
            console.error('getBookById ERROR:', err);
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // POST /api/books
    async createBook(req, res) {
        try {
            const { title, isbn, publisher_id, total_copies, author_ids, category_ids } = req.body;

            // เช็ค field
            if (!title || !total_copies) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'กรุณากรอก title และ total_copies' 
                });
            }

            const book = await Book.create({ 
                title, isbn, publisher_id, total_copies, author_ids, category_ids 
            });

            res.status(201).json({ success: true, data: book });
        } catch (err) {
            console.error('createBook ERROR:', err);
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // PUT /api/books/:id
    async updateBook(req, res) {
        try {
            const { title, isbn, publisher_id, total_copies } = req.body;

            const book = await Book.update(req.params.id, { 
                title, isbn, publisher_id, total_copies 
            });

            if (!book) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'ไม่พบหนังสือ' 
                });
            }

            res.json({ success: true, data: book });
        } catch (err) {
            console.error('updateBook ERROR:', err);
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // DELETE /api/books/:id
    async deleteBook(req, res) {
        try {
            const book = await Book.remove(req.params.id);

            if (!book) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'ไม่พบหนังสือ' 
                });
            }

            res.json({ success: true, message: 'ลบหนังสือสำเร็จ' });
        } catch (err) {
            console.error('deleteBook ERROR:', err);
            res.status(500).json({ success: false, message: err.message });
        }
    }
};