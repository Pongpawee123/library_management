module.exports = (err, req, res, next) => {
    console.error('ERROR:', err.message);

    // เช็ค error แต่ละประเภท
    if (err.code === '23505') {
        // unique constraint — ข้อมูลซ้ำ
        return res.status(400).json({
            success: false,
            message: 'ข้อมูลนี้มีอยู่แล้ว'
        });
    }

    if (err.code === '23503') {
        // foreign key — ไม่พบข้อมูลที่อ้างอิง
        return res.status(400).json({
            success: false,
            message: 'ไม่พบข้อมูลที่อ้างอิง'
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token ไม่ถูกต้อง'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token หมดอายุ'
        });
    }

    // error ทั่วไป
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};