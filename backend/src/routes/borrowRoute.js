const express = require('express');
const router = express.Router();
const BorrowController = require('../controllers/borrowController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

router.get('/',
    authenticateToken,
    authorize('admin', 'librarian'),
    BorrowController.getAllBorrows
);
router.get('/member/:member_id',
    authenticateToken,
    authorize('admin', 'librarian'),
    BorrowController.getBorrowsByMember
);
router.get('/:id',
    authenticateToken,
    authorize('admin', 'librarian'),
    BorrowController.getBorrowById
);
router.post('/',
    authenticateToken,
    authorize('admin', 'librarian'),
    BorrowController.borrowBook
);
router.put('/:id/return',
    authenticateToken,
    authorize('admin', 'librarian'),
    BorrowController.returnBook
);
router.put('/:id/extend',
    authenticateToken,
    authorize('admin', 'librarian'),
    BorrowController.extendBorrow
);

module.exports = router;