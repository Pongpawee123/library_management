// src/routes/accountRoute.js
const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

// ดู user ทั้งหมด
router.get('/',      authenticateToken, AccountController.getAccount);
// ดู user คนเดียว
router.get('/:id',   authenticateToken, AccountController.getById);

module.exports = router;