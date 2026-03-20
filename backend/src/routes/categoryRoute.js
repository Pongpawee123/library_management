const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

router.get('/',      CategoryController.getAllCategories);
router.get('/:id',   CategoryController.getCategoryById);

router.post('/',
    authenticateToken,
    authorize('admin', 'librarian'),
    CategoryController.createCategory
);
router.put('/:id',
    authenticateToken,
    authorize('admin', 'librarian'),
    CategoryController.updateCategory
);
router.delete('/:id',
    authenticateToken,
    authorize('admin'),
    CategoryController.deleteCategory
);

module.exports = router;