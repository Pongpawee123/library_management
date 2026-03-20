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
    }
};