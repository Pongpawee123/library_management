module.exports = {

    // เช็ค login
    validateLogin(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'กรุณากรอก email และ password'
            });
        }
        if (!email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'รูปแบบ email ไม่ถูกต้อง'
            });
        }
        next();
    },

    // เช็ค book
    validateBook(req, res, next) {
        const { title, total_copies } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'กรุณากรอกชื่อหนังสือ'
            });
        }
        if (!total_copies || total_copies < 0) {
            return res.status(400).json({
                success: false,
                message: 'กรุณากรอกจำนวนหนังสือให้ถูกต้อง'
            });
        }
        next();
    },

    // เช็ค member
    validateMember(req, res, next) {
        const { email, password, full_name } = req.body;

        if (!email || !password || !full_name) {
            return res.status(400).json({
                success: false,
                message: 'กรุณากรอก email, password และ full_name'
            });
        }
        if (!email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'รูปแบบ email ไม่ถูกต้อง'
            });
        }
        next();
    },

    // เช็ค borrow
    validateBorrow(req, res, next) {
        const { member_id, book_id } = req.body;

        if (!member_id || !book_id) {
            return res.status(400).json({
                success: false,
                message: 'กรุณาระบุ member_id และ book_id'
            });
        }
        next();
    }
};