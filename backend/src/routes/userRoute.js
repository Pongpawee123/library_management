// src/routes/userRoute.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

// GET /api/users — ดู users ทั้งหมด (admin เท่านั้น)
router.get('/',
    authenticateToken,
    authorize('admin'),
    UserController.getAllUsers
);

// GET /api/users/:id — ดู user คนเดียว (admin เท่านั้น)
router.get('/:id',
    authenticateToken,
    authorize('admin'),
    UserController.getUserById
);

// POST /api/users — สร้าง user ใหม่ (admin เท่านั้น)
router.post('/',
    authenticateToken,
    authorize('admin'),
    UserController.createUser
);

// PUT /api/users/:id/role — เปลี่ยน role (admin เท่านั้น)
router.put('/:id/role',
    authenticateToken,
    authorize('admin'),
    UserController.updateRole
);

// PUT /api/users/:id/password — เปลี่ยน password (admin เท่านั้น)
router.put('/:id/password',
    authenticateToken,
    authorize('admin'),
    UserController.updatePassword
);

// DELETE /api/users/:id — ลบ user (admin เท่านั้น)
router.delete('/:id',
    authenticateToken,
    authorize('admin'),
    UserController.deleteUser
);

module.exports = router;