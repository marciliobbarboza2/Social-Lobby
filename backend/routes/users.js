const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', verifyToken, userController.getProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', verifyToken, [
  body('firstName').optional().isLength({ min: 2, max: 50 }),
  body('lastName').optional().isLength({ min: 2, max: 50 }),
  body('bio').optional().isLength({ max: 500 }),
  body('avatar').optional().isURL(),
  body('address').optional().isLength({ min: 1 }),
  body('phone').optional().isLength({ min: 1 }),
  body('city').optional().isLength({ min: 1 }),
  body('groups').optional().isArray(),
  body('maritalStatus').optional().isIn(['Single', 'Married', 'Divorced', 'Widowed', 'In a relationship', 'It\'s complicated'])
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.updateProfile);

// @desc    Get user's posts
// @route   GET /api/users/:id/posts
// @access  Public
router.get('/:id/posts', [
  param('id').isMongoId(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.getUserPosts);

module.exports = router;
