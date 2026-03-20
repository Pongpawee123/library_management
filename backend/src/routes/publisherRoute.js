const express = require('express');
const router = express.Router();
const PublisherController = require('../controllers/publisherController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

router.get('/',      PublisherController.getAllPublishers);
router.get('/:id',   PublisherController.getPublisherById);

router.post('/',
    authenticateToken,
    authorize('admin', 'librarian'),
    PublisherController.createPublisher
);
router.put('/:id',
    authenticateToken,
    authorize('admin', 'librarian'),
    PublisherController.updatePublisher
);
router.delete('/:id',
    authenticateToken,
    authorize('admin'),
    PublisherController.deletePublisher
);

module.exports = router;