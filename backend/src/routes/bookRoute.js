// src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

router.get('/',      BookController.getAllBooks);
router.get('/:id',   BookController.getBookById);

router.post('/',     authenticateToken, BookController.createBook);
router.put('/:id',   authenticateToken, BookController.updateBook);
router.delete('/:id',authenticateToken, BookController.deleteBook);

module.exports = router;