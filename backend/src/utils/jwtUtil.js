const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || '123456789abcdefg';

module.exports = {

    // สร้าง Token
    generateToken(payload) {
        return jwt.sign(payload, SECRET, { expiresIn: '1h' });
    },

    // ถอดรหัส Token
    verifyToken(token) {
        return jwt.verify(token, SECRET);
    }
};