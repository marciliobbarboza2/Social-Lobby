/**
 * Post Routes
 *
 * This module defines the API endpoints for post management including:
 * - Creating new posts
 * - Retrieving posts (all posts or single post)
 * - Updating existing posts
 * - Deleting posts
 * - Liking/unliking posts
 *
 * All routes except GET use JWT authentication via verifyToken middleware.
 * Input validation is handled by express-validator.
 */

const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// @desc    Get all published posts
// @route   GET /api/posts
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isIn(['technology', 'lifestyle', 'travel', 'food', 'health', 'business', 'other']),
  query('search').optional().isLength({ min: 1 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, postController.getPosts);

// @desc    Get recent posts
// @route   GET /api/posts/recent
// @access  Public
// router.get('/recent', postController.getRecentPosts);

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', [
  param('id').isLength({ min: 1 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, postController.getPost);

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
router.post('/', verifyToken, [
  body('title').isLength({ min: 5, max: 200 }),
  body('content').isLength({ min: 50 }),
  body('excerpt').optional().isLength({ max: 300 }),
  body('featuredImage').optional().isURL(),
  body('category').optional().isIn(['technology', 'lifestyle', 'travel', 'food', 'health', 'business', 'other']),
  body('tags').optional().isArray(),
  body('status').optional().isIn(['draft', 'published'])
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, postController.createPost);

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
router.put('/:id', verifyToken, [
  param('id').isLength({ min: 1 }),
  body('title').optional().isLength({ min: 5, max: 200 }),
  body('content').optional().isLength({ min: 50 }),
  body('excerpt').optional().isLength({ max: 300 }),
  body('featuredImage').optional().isURL(),
  body('category').optional().isIn(['technology', 'lifestyle', 'travel', 'food', 'health', 'business', 'other']),
  body('tags').optional().isArray(),
  body('status').optional().isIn(['draft', 'published'])
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, postController.updatePost);

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete('/:id', verifyToken, [
  param('id').isLength({ min: 1 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, postController.deletePost);

// @desc    Toggle like on post
// @route   POST /api/posts/:id/like
// @access  Private
router.post('/:id/like', verifyToken, [
  param('id').isLength({ min: 1 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, postController.toggleLike);

module.exports = router;