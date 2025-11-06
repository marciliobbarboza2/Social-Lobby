/**
 * Authentication Routes
 *
 * This module defines the API endpoints for user authentication including:
 * - User registration (signup)
 * - User login
 * - User logout
 * - Token verification (me endpoint)
 * - Account deletion
 *
 * All routes use express-validator for input validation and JWT tokens for authentication.
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const logger = require('../utils/logger');
const { RateLimiterMongo } = require('rate-limiter-flexible');

const router = express.Router();

// Rate limiter for login attempts
const loginLimiter = new RateLimiterMongo({
  storeClient: require('mongoose').connection,
  keyPrefix: 'login_fail',
  points: 5, // Number of attempts
  duration: 60 * 60, // Store number of attempts for 1 hour
  blockDuration: 60 * 15 // Block for 15 minutes
});

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', [
  body('username').isLength({ min: 3, max: 30 }).matches(/^[a-zA-Z0-9_-]+$/),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').isLength({ min: 2, max: 50 }),
  body('lastName').isLength({ min: 2, max: 50 })
], async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, firstName, lastName, bio, avatar } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      bio,
      avatar
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User registered: ${username}`);

    res.status(201).json({
      success: true,
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res, next) => {
  try {
    await loginLimiter.consume(req.ip);
  } catch (rlRejected) {
    if (rlRejected instanceof Error) {
      return next(rlRejected);
    }
    return res.status(429).json({
      message: 'Too many login attempts. Please try again later.',
      nextValidRequestAt: new Date(Date.now() + rlRejected.msBeforeNext)
    });
  }
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ message: 'Account is deactivated' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User logged in: ${user.username}`);

    res.json({
      success: true,
      token,
      user: user.getPublicProfile(),
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', verifyToken, (req, res, next) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // We could implement token blacklisting here if needed
    logger.info(`User logged out: ${req.user.username}`);

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    next(error);
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    logger.error('Get me error:', error);
    next(error);
  }
});

module.exports = router;
