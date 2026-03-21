// src/routes/authRoute.js
const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

// ไม่ต้อง Token
router.post('/login',    AccountController.login);
router.post('/register', AccountController.register);

// ต้อง Token
router.get('/profile',   authenticateToken, AccountController.getProfile);
router.get('/accounts',  authenticateToken, AccountController.getAccount);

module.exports = router;