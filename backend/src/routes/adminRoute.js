const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const requireAdmin = require('../middleware/adminMiddleware.js');

// Protect all admin routes
router.use(authenticateToken, requireAdmin);

router.get('/dashboard', AdminController.getDashboard);
router.get('/borrowings', AdminController.getAllBorrowings);
router.patch('/borrow/:id/approve', AdminController.approveBorrow);
router.patch('/borrow/:id/return', AdminController.returnBorrow);

// Member Management
router.get('/members', AdminController.getAllMembers);
router.post('/members', AdminController.createMember);
router.patch('/members/:id/toggle', AdminController.toggleMemberStatus);
router.delete('/members/:id', AdminController.deleteMember);

module.exports = router;
