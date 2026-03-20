const User = require('../models/user.js');
const response = require('../utils/responseUtil.js');

module.exports = {

    // GET /api/users — ดู users ทั้งหมด
    async getAllUsers(req, res) {
        try {
            const users = await User.getAll();
            return response.success(res, users);
        } catch (err) {
            console.error('getAllUsers ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // GET /api/users/:id — ดู user คนเดียว
    async getUserById(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user) return response.notFound(res, 'ไม่พบผู้ใช้งาน');
            return response.success(res, user);
        } catch (err) {
            console.error('getUserById ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // POST /api/users — สร้าง user ใหม่
    async createUser(req, res) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password || !role) {
                return response.badRequest(res, 'กรุณากรอก email, password และ role');
            }

            const allowedRoles = ['admin', 'librarian', 'member'];
            if (!allowedRoles.includes(role)) {
                return response.badRequest(res, 'Role ไม่ถูกต้อง');
            }

            const user = await User.create({ email, password, role });
            return response.created(res, user);
        } catch (err) {
            console.error('createUser ERROR:', err);
            if (err.code === '23505') {
                return response.badRequest(res, 'Email นี้ถูกใช้แล้ว');
            }
            return response.error(res, err.message);
        }
    },

    // PUT /api/users/:id/role — เปลี่ยน role
    async updateRole(req, res) {
        try {
            const { role } = req.body;

            const allowedRoles = ['admin', 'librarian', 'member'];
            if (!allowedRoles.includes(role)) {
                return response.badRequest(res, 'Role ไม่ถูกต้อง');
            }

            const user = await User.updateRole(req.params.id, role);
            if (!user) return response.notFound(res, 'ไม่พบผู้ใช้งาน');
            return response.success(res, user);
        } catch (err) {
            console.error('updateRole ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // PUT /api/users/:id/password — เปลี่ยน password
    async updatePassword(req, res) {
        try {
            const { newPassword } = req.body;

            if (!newPassword) {
                return response.badRequest(res, 'กรุณากรอก newPassword');
            }

            const user = await User.updatePassword(req.params.id, newPassword);
            if (!user) return response.notFound(res, 'ไม่พบผู้ใช้งาน');
            return response.success(res, { message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
        } catch (err) {
            console.error('updatePassword ERROR:', err);
            return response.error(res, err.message);
        }
    },

    // DELETE /api/users/:id — ลบ user
    async deleteUser(req, res) {
        try {
            const user = await User.remove(req.params.id);
            if (!user) return response.notFound(res, 'ไม่พบผู้ใช้งาน');
            return response.success(res, { message: 'ลบผู้ใช้งานสำเร็จ' });
        } catch (err) {
            console.error('deleteUser ERROR:', err);
            return response.error(res, err.message);
        }
    }
};