// src/controllers/categoryController.js
const Category = require('../models/category.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/categories — ดูหมวดหมู่ทั้งหมด
    async getAllCategories(req, res) {
        try {
            const categories = await Category.getAll();
            return response.success(res, categories);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // GET /api/categories/:id — ดูหมวดหมู่เดียว
    async getCategoryById(req, res) {
        try {
            const category = await Category.getById(req.params.id);
            if (!category) return response.notFound(res, 'ไม่พบหมวดหมู่');
            return response.success(res, category);
        } catch (err) {
            return response.error(res, err.message);
        }
    },

    // POST /api/categories — เพิ่มหมวดหมู่ใหม่
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            if (!name) return response.badRequest(res, 'กรุณากรอกชื่อหมวดหมู่');
            const category = await Category.create({ name });
            return response.created(res, category);
        } catch (err) {
            if (err.code === '23505') {
                return response.badRequest(res, 'ชื่อหมวดหมู่นี้มีอยู่แล้ว');
            }
            return response.error(res, err.message);
        }
    },

    // PUT /api/categories/:id — แก้ไขหมวดหมู่
    async updateCategory(req, res) {
        try {
            const { name } = req.body;
            if (!name) return response.badRequest(res, 'กรุณากรอกชื่อหมวดหมู่');
            const category = await Category.update(req.params.id, { name });
            if (!category) return response.notFound(res, 'ไม่พบหมวดหมู่');
            return response.success(res, category);
        } catch (err) {
            if (err.code === '23505') {
                return response.badRequest(res, 'ชื่อหมวดหมู่นี้มีอยู่แล้ว');
            }
            return response.error(res, err.message);
        }
    },

    // DELETE /api/categories/:id — ลบหมวดหมู่
    async deleteCategory(req, res) {
        try {
            const category = await Category.remove(req.params.id);
            if (!category) return response.notFound(res, 'ไม่พบหมวดหมู่');
            return response.success(res, { message: 'ลบหมวดหมู่สำเร็จ' });
        } catch (err) {
            return response.error(res, err.message);
        }
    }
};