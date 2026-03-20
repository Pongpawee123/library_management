const authorize = (...roles) => {

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'กรุณา Login ก่อน'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `ไม่มีสิทธิ์เข้าถึง ต้องเป็น ${roles.join(' หรือ ')} เท่านั้น`
            });
        }
        next();
    };
};

module.exports = authorize;