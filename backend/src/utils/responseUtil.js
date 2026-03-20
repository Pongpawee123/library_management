module.exports = {

    success(res, data, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            data: data
        });
    },
    created(res, data) {
        return res.status(201).json({
            success: true,
            data: data
        });
    },
    error(res, message, statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message: message
        });
    },
    notFound(res, message = 'ไม่พบข้อมูล') {
        return res.status(404).json({
            success: false,
            message: message
        });
    },
    badRequest(res, message = 'ข้อมูลไม่ถูกต้อง') {
        return res.status(400).json({
            success: false,
            message: message
        });
    }
};