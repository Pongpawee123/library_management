const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

router.get('/',      BookController.getAllBooks);
router.get('/:id',   BookController.getBookById);

router.post('/',
    authenticateToken,
    authorize('admin', 'librarian'),
    BookController.createBook
);
router.put('/:id',
    authenticateToken,
    authorize('admin', 'librarian'),
    BookController.updateBook
);
router.delete('/:id',
    authenticateToken,
    authorize('admin'),
    BookController.deleteBook
);

module.exports = router;