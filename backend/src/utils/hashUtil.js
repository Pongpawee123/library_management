const bcrypt = require('bcrypt');

module.exports = {

    // เข้ารหัส password
    async hash(password) {
        return await bcrypt.hash(password, 10);
    },

    // เช็ค password
    async compare(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
};