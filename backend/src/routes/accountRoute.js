// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

// ไม่ต้อง Token
router.post('/login',    AuthController.login);

// ต้อง Token
router.get('/profile',   authenticateToken, AuthController.getProfile);
router.get('/accounts',  authenticateToken, AuthController.getAccount);

module.exports = router;