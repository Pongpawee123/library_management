const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

// admin และ librarian เท่านั้น
router.get('/summary',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReportController.getSummary
);
router.get('/overdue',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReportController.getOverdue
);
router.get('/popular-books',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReportController.getPopularBooks
);
router.get('/borrow-history',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReportController.getBorrowHistory
);
router.get('/fines',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReportController.getFines
);
router.get('/member-activity',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReportController.getMemberActivity
);

module.exports = router;