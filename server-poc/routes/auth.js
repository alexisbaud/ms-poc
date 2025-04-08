const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user profile (protected route)
router.get('/profile', authMiddleware.verifyToken, authController.getUserProfile);

module.exports = router; 