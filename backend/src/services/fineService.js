module.exports = {

    // คำนวณค่าปรับ วันละ 5 บาท
    calculateFine(due_date) {
        const now = new Date();
        const due = new Date(due_date);

        // ยังไม่เกินกำหนด ไม่มีค่าปรับ
        if (now <= due) return 0;

        // คำนวณจำนวนวันที่เกิน
        const diffDays = Math.ceil((now - due) / (1000 * 60 * 60 * 24));

        // วันละ 5 บาท
        return diffDays * 5;
    }
};