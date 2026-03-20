module.exports = {

    // แปลง query string เป็น limit/offset
    getPagination(query) {
        const page   = parseInt(query.page)  || 1;
        const limit  = parseInt(query.limit) || 10;
        const offset = (page - 1) * limit;
        return { page, limit, offset };
    },

    // จัดรูปแบบผลลัพธ์
    formatResult(data, total, page, limit) {
        return {
            items: data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
};