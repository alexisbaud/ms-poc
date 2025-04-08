const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// Register a new user - limite les tentatives pour empêcher les créations massives de comptes
router.post('/register', authLimiter, authController.register);

// Login user - limite les tentatives pour empêcher les attaques par force brute
router.post('/login', authLimiter, authController.login);

// Get current user profile (protected route)
router.get('/profile', authMiddleware.authenticateToken, authController.getUserProfile);

module.exports = router; 