// src/controllers/accountController.js
const AuthService = require('../services/authService.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // POST /api/auth/login — เข้าสู่ระบบ
    async login(req, res) {
        try {
            const result = await AuthService.login(
                req.body.email,
                req.body.password
            );
            return response.success(res, result);
        } catch (err) {
            console.error('login ERROR:', err);
            const status = err.message.includes('กรุณา') ? 400 : 401;
            return response.error(res, err.message, status);
        }
    },

    // POST /api/auth/register — สมัครสมาชิกใหม่
    async register(req, res) {
        try {
            const result = await AuthService.register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            return response.created(res, result);
        } catch (err) {
            console.error('register ERROR:', err);
            return response.error(res, err.message, 400);
        }
    },

    // GET /api/auth/profile — ดูโปรไฟล์ตัวเอง
    async getProfile(req, res) {
        try {
            const user = await AuthService.getProfile(req.user.sub);
            return response.success(res, user);
        } catch (err) {
            console.error('getProfile ERROR:', err);
            return response.notFound(res, err.message);
        }
    },

    // GET /api/auth/accounts — ดู users ทั้งหมด
    async getAccount(req, res) {
        try {
            const Account = require('../models/account.js');
            const accounts = await Account.getAll();
            return response.success(res, accounts);
        } catch (err) {
            console.error('getAccount ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/auth/accounts/:id — ดู user คนเดียวตาม id
    async getById(req, res) {
        try {
            const Account = require('../models/account.js');
            const account = await Account.getById(req.params.id);
            if (!account) return response.notFound(res, 'ไม่พบบัญชีผู้ใช้');
            return response.success(res, account);
        } catch (err) {
            console.error('getById ERROR:', err);
            return response.error(res, err.message);
        }
    }
};