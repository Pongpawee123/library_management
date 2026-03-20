// src/services/authService.js
const Account = require('../models/account.js');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || "123456789abcdefg";

module.exports = {

    // Logic การ login ทั้งหมดอยู่ที่นี่
    async login(email, password) {

        // 1. เช็ค field ครบไหม
        if (!email || !password) {
            throw new Error('กรุณากรอก email และ password');
        }

        // 2. หา user จาก DB
        const user = await Account.login(email, password);
        
        // 3. เช็คว่าเจอไหม
        if (!user) {
            throw new Error('email หรือ password ไม่ถูกต้อง');
        }
        // 4. สร้าง Token
        const token = jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            secret,
            { expiresIn: '1h' }
        );
        // 5. return ข้อมูลกลับไป
        return {
            access_token: token,
            token_type: 'bearer',
            email: user.email,
            role: user.role,
            expires_in: 3600
        };
    },

    // Logic ดึง profile
    async getProfile(id) {
        const user = await Account.getById(id);
        if (!user) {
            throw new Error('ไม่พบผู้ใช้งาน');
        }
        return {
            id: user.id,
            email: user.email,
            role: user.role
        };
    }
};