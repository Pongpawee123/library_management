const express = require('express');
const router = express.Router();
const BorrowController = require('../controllers/borrowController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

router.get('/',
    authenticateToken,
    authorize('admin', 'librarian', 'staff'),
    BorrowController.getAllBorrows
);
router.get('/member/:member_id',
    authenticateToken,
    authorize('admin', 'librarian', 'staff'),
    BorrowController.getBorrowsByMember
);
router.get('/:id',
    authenticateToken,
    authorize('admin', 'librarian', 'staff'),
    BorrowController.getBorrowById
);
router.post('/',
    authenticateToken,
    authorize('admin', 'librarian', 'staff'),
    BorrowController.borrowBook
);
router.put('/:id/return',
    authenticateToken,
    authorize('admin', 'librarian', 'staff'),
    BorrowController.returnBook
);
router.put('/:id/extend',
    authenticateToken,
    authorize('admin', 'librarian', 'staff'),
    BorrowController.extendBorrow
);

module.exports = router;