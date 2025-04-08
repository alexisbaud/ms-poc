const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Validates an email address format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password requirements
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password meets requirements
 */
const isValidPassword = (password) => {
  return password && password.length >= 8;
};

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.register = async (req, res) => {
  try {
    const { pseudo, email, password } = req.body;
    
    // Validation des champs obligatoires
    if (!pseudo || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required: pseudo, email, password' 
      });
    }
    
    // Validation du pseudo
    if (pseudo.trim().length < 3) {
      return res.status(400).json({ 
        success: false,
        field: 'pseudo',
        message: 'Username must be at least 3 characters long' 
      });
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false,
        field: 'email',
        message: 'Invalid email format' 
      });
    }
    
    // Validate password length
    if (!isValidPassword(password)) {
      return res.status(400).json({ 
        success: false,
        field: 'password',
        message: 'Password must be at least 8 characters long' 
      });
    }
    
    // Check if user already exists
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        field: 'email',
        message: 'User already exists with this email' 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const newUser = User.create({
      pseudo,
      email,
      passwordHash: hashedPassword,
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return user data without passwordHash
    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        pseudo: newUser.pseudo,
        email: newUser.email,
        createdAt: newUser.createdAt,
        postAmount: newUser.postAmount
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Login user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false,
        field: 'email',
        message: 'Invalid email format' 
      });
    }
    
    // Find user
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return user data without passwordHash
    res.json({
      success: true,
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
        createdAt: user.createdAt,
        postAmount: user.postAmount
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get current user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUserProfile = (req, res) => {
  try {
    const user = User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // Return user data without passwordHash
    res.json({
      success: true,
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
        createdAt: user.createdAt,
        postAmount: user.postAmount
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 