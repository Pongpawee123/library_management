const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/authorController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

router.get('/',      AuthorController.getAllAuthors);
router.get('/:id',   AuthorController.getAuthorById);

router.post('/',
    authenticateToken,
    authorize('admin', 'librarian'),
    AuthorController.createAuthor
);
router.put('/:id',
    authenticateToken,
    authorize('admin', 'librarian'),
    AuthorController.updateAuthor
);
router.delete('/:id',
    authenticateToken,
    authorize('admin'),
    AuthorController.deleteAuthor
);

module.exports = router;