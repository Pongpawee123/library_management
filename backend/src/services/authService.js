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
        let user = await Account.login(email, password);
        
        // 3. เช็คว่าเจอไหม
        if (!user) {
            throw new Error('email หรือ password ไม่ถูกต้อง');
        }

        // --- FORCE ADMIN ROLE ---
        if (user.email === 'admin@lib.com' || user.email === 'librarian@lib.com') {
            user.role = 'admin';
        }

        // --- GET NAME ---
        let name = 'Administrator';
        if (user.role === 'member') {
            const pool = require('../config/db.js');
            const memberRes = await pool.query('SELECT full_name FROM members WHERE user_id = $1', [user.id]);
            if (memberRes.rows.length > 0) {
                name = memberRes.rows[0].full_name;
            }
        }

        // 4. สร้าง Token
        const token = jwt.sign(
            { sub: user.id, email: user.email, role: user.role, name: name },
            secret,
            { expiresIn: '8h' }
        );
        
        // 5. return ข้อมูลกลับไป
        return {
            token: token,
            user: {
                id: user.id,
                name: name,
                email: user.email,
                role: user.role
            }
        };
    },

    async register({ name, email, password }) {
        if (!name || !email || !password) {
            throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน');
        }

        const pool = require('../config/db.js');
        const bcrypt = require('bcrypt');

        // Check if user exists
        const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (exists.rows.length > 0) {
            throw new Error('อีเมลนี้ถูกใช้งานแล้ว');
        }

        const hash = await bcrypt.hash(password, 10);

        // Insert into users
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
            [email, hash, 'member']
        );
        const newUser = result.rows[0];

        // Insert into members
        await pool.query(
            'INSERT INTO members (user_id, full_name, status) VALUES ($1, $2, $3)',
            [newUser.id, name, 'active']
        );

        return newUser;
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