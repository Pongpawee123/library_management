const Account = require('../models/authModel.js');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || "123456789abcdefg";

module.exports = {

    async getAccount(req, res) {
        try {
            const accounts = await Account.getAll();
            res.json(accounts);
        } catch (err) {
            console.error("getAccount ERROR:", err);
            return res.status(500).json({ error: "Internal Server Error", message: err?.message });
        }
    },

    async getProfile(req, res) {
        try {
            const user = await Account.getById(req.user.sub);
            //                                  ↑ sub มาจาก JWT token ที่ sign ไว้
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json({ id: user.id, email: user.email, role: user.role });
        } catch (err) {
            console.error("getProfile ERROR:", err);
            return res.status(500).json({ error: "Internal Server Error", message: err?.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(`Login Attempt for user: ${email}`);

            if (!email || !password) {
                return res.status(400).json({ error: 'กรุณากรอก email และ password' });
            }

            let user = await Account.login(email, password);

            if (user == null) {
                return res.status(400).json({ error: 'email หรือ password ไม่ถูกต้อง' });
            } else {
                const token = jwt.sign(
                    { sub: user.id, email: user.email, role: user.role },
                    
                    secret,
                    { expiresIn: '1h' }
                );

                return res.json({
                    access_token: token,
                    token_type: 'bearer',
                    email: user.email,
                    role: user.role,
                    expires_in: 3600
                });
            }
        } catch (err) {
            console.error("login ERROR:", err);
            return res.status(500).json({ error: "Internal Server Error", message: err?.message });
        }
    }
};