const Book = require('../models/books.js');

module.exports = {

    // ดึงหนังสือทั้งหมด
    async getAllBooks() {
        const books = await Book.getAll();
        return books;
    },
    // ดึงหนังสือเล่มเดียว
    async getBookById(id) {
        if (!id) throw new Error('กรุณาระบุ id');

        const book = await Book.getById(id);
        if (!book) throw new Error('ไม่พบหนังสือ');

        return book;
    },
    // เพิ่มหนังสือใหม่
    async createBook({ title, isbn, publisher_id, total_copies, author_ids, category_ids }) {

        // เช็ค field ที่จำเป็น
        if (!title) throw new Error('กรุณากรอกชื่อหนังสือ');
        if (!total_copies) throw new Error('กรุณากรอกจำนวนหนังสือ');
        if (total_copies < 0) throw new Error('จำนวนหนังสือต้องมากกว่า 0');

        const book = await Book.create({ 
            title, isbn, publisher_id, total_copies, author_ids, category_ids 
        });

        return book;
    },
    // แก้ไขหนังสือ
    async updateBook(id, { title, isbn, publisher_id, total_copies }) {

        // เช็คว่ามีหนังสือนี้ไหม
        const existing = await Book.getById(id);
        if (!existing) throw new Error('ไม่พบหนังสือ');

        // เช็ค field
        if (!title) throw new Error('กรุณากรอกชื่อหนังสือ');

        const book = await Book.update(id, { 
            title, isbn, publisher_id, total_copies 
        });

        return book;
    },
    // ลบหนังสือ
    async deleteBook(id) {

        // เช็คว่ามีหนังสือนี้ไหม
        const existing = await Book.getById(id);
        if (!existing) throw new Error('ไม่พบหนังสือ');

        await Book.remove(id);
        return { message: 'ลบหนังสือสำเร็จ' };
    }
};